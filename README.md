# Continuation directions: listening explorer

Static listening site for 3,177 generated continuations (Anticipatory Music Transformer, top-p 0.98) of 50 POP909
16-beat prefixes, grouped per prefix by three representations: interpretable rules (revised), frozen CLaMP3 C2
embeddings, and AMT event-state trajectories (4 / 8 / 16 beats). Open `index.html` (best served over http, e.g.
GitHub Pages or `python3 -m http.server`). Maps are 2-D MDS of each method's original distances (display only);
cluster descriptions are heuristic / external rule annotations; listening judgements are pending.

## One-bar continuations (`onebar/`)

512 generated one-bar continuations for each of 19 prefixes (1024 for pop909-839), clustered per prefix with the
rules features; clusters named by Qwen3-32B from deterministic evidence.

- **Prefixes:** clusters, names, choice types and the song's real next bar.
- **Naming patterns:** named clusters grouped by choice type across prefixes.
- **Pooled types:** one clustering of 3,192 samples from 50 prefixes, with its replication limits.

Each clip plays the last prefix bar, then the continuation.
