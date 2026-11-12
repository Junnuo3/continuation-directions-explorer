# Continuation directions: listening explorer

Static listening site for 3,177 generated continuations (Anticipatory Music Transformer, top-p 0.98) of 50 POP909
16-beat prefixes, grouped per prefix by three representations: interpretable rules (revised), frozen CLaMP3 C2
embeddings, and AMT event-state trajectories (4 / 8 / 16 beats). Open `index.html` (best served over http, e.g.
GitHub Pages or `python3 -m http.server`). Maps are 2-D MDS of each method's original distances (display only);
cluster descriptions are heuristic / external rule annotations; listening judgements are pending.

## One-bar continuations (`onebar/`)

The same 50 POP909 prefixes with 64 generated one-bar continuations each (three prefixes have 54-59; 3,177 in total).
Per prefix and method (Rules / CLaMP3 / AMT): clusters on a 2-D map, cluster titles written by Qwen3-32B, and
click-to-listen (the last prefix bar, then the continuation). Titles are still being added for some clusters.

## Choosing a continuation step by step (`decisions/`)

An interactive prototype for three POP909 prefixes (pop909-316, -585 and -698). Every option on the page was generated in advance (AMT music-medium-800k, top-p 0.98, GPU) and grouped by the rules representation. It offers two workflows:

- **Sequential:** choose the next bar four times. At each step the candidates were sampled from the music including the bars already chosen.
- **Coarse-to-fine:** first pick a *direction* for the whole 4-bar phrase. Directions are groups of 1024 four-bar continuations, compared bar by bar: does each bar reuse earlier material, does its opening chord hold, return to a prefix chord or bring a new one, does it get thinner or busier, and does the phrase end on the tonic. Then refine the direction in one of two ways:
  - *plan + regenerate*: each bar is generated fresh and filtered by the direction's plan;
  - *pool narrowing*: choose inside the saved 4-bar samples.

Options can be described in full, by rhythm and texture, by harmony, or in plain words. Qwen3-32B wrote these descriptions from measured evidence; a deterministic choice-type label is always shown as well. When a view hides what separates two options, they are merged into one card so you can tell them apart by listening.

Only the most common options were expanded. Others are marked *not generated*. No listening judgements have been collected: the groups are clusters, not validated categories. The method and results are in `docs/decisions_v1_report.md` of the research repository.
