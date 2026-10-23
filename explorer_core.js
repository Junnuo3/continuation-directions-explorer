// Pure functions of the new_rule listening explorer (shared by the page and the node parity test).
// Mirrors src/clustering/agglomerative.py (threshold cut, relabel, medoid) and src/clustering/describe.py
// (cluster_description) so assignments at any threshold match Python exactly.
(function (root) {
  "use strict";

  // index of pair (i, j), i != j, in a row-major upper triangle of an n x n matrix
  function tri(i, j, n) {
    if (i > j) { const t = i; i = j; j = t; }
    return i * n - (i * (i + 1)) / 2 + (j - i - 1);
  }

  function dist(D, i, j, n) { return i === j ? 0 : D[tri(i, j, n)]; }

  // Cut a scipy average-linkage matrix: apply merges with height < t (sklearn distance_threshold semantics).
  // Returns labels 0..K-1 ordered by size (desc) then first member index, as relabel() in Python.
  function cut(Z, n, t) {
    const members = [];
    for (let i = 0; i < n; i++) members.push([i]);
    for (let k = 0; k < Z.length; k++) {
      const [a, b, h] = Z[k];
      if (h < t) { members.push(members[a].concat(members[b])); members[a] = null; members[b] = null; }
      else members.push(null);
    }
    // nodes consumed by an applied merge were nulled; the remaining nodes are the clusters
    const live = members.filter(m => m !== null).map(g => g.slice().sort((x, y) => x - y));
    live.sort((g1, g2) => (g2.length - g1.length) || (g1[0] - g2[0]));
    const labels = new Array(n);
    live.forEach((g, k) => g.forEach(i => { labels[i] = k; }));
    return labels;
  }

  function groupsOf(labels) {
    const g = [];
    labels.forEach((lab, i) => { (g[lab] = g[lab] || []).push(i); });
    return g;
  }

  // member minimizing the summed distance to the other members; ties -> first member (ascending index)
  function medoid(D, n, members) {
    let best = members[0], bestS = Infinity;
    for (const i of members) {
      let s = 0;
      for (const j of members) s += dist(D, i, j, n);
      if (s < bestS) { bestS = s; best = i; }
    }
    return best;
  }

  function cmpStr(a, b) { return a < b ? -1 : a > b ? 1 : 0; }

  // tags held by >= minPrev of members; distinctive if prevalence - pool prevalence >= minLift
  function describe(memberTags, allTags, minPrev, minLift) {
    const n = memberTags.length, nPool = allTags.length;
    const count = (lists) => { const c = new Map(); for (const ts of lists) for (const t of new Set(ts)) c.set(t, (c.get(t) || 0) + 1); return c; };
    const counts = count(memberTags), pool = count(allTags);
    const out = [];
    for (const [tag, c] of counts) {
      if (c / n >= minPrev) {
        const base = (pool.get(tag) || 0) / nPool;
        out.push({ tag, prevalence: c / n, count: c, pool_prevalence: base, distinctive: c / n - base >= minLift });
      }
    }
    out.sort((x, y) => (x.distinctive === y.distinctive ? 0 : x.distinctive ? -1 : 1) || (y.prevalence - x.prevalence) || cmpStr(x.tag, y.tag));
    return out;
  }

  const api = { tri, dist, cut, groupsOf, medoid, describe };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.NRCore = api;
})(this);
