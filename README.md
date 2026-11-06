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
