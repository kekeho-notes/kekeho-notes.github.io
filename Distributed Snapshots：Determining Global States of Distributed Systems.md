---
tags:
  - 論文
authors:
  - "[[Leslie Lamport]]"
  - K. Mani Chandy
keywords:
  - Distributed Snapshots
  - Global State
URL: https://doi.org/10.1145/214451.214456
---
# 書誌情報
- **タイトル**: Distributed Snapshots：Determining Global States of Distributed Systems
- **著者**: [[Leslie Lamport]]. [[K. Mani Chandy]]
- **出版年**: 1985
- **Abstract**: This paper presents an algorithm by which a process in a distributed system determines a global state of the system during a computation. Many problems in distributed systems can be cast in terms of the problem of detecting global states. For instance, the global state detection algorithm helps to solve an important class of problems: stable property detection. A stable property is one that persists: once a stable property becomes true it remains true thereafter. Examples of stable properties are “computation has terminated,” “ the system is deadlocked” and “all tokens in a token ring have disappeared.” The stable property detection problem is that of devising algorithms to detect a given stable property. Global state detection can also be used for checkpointing.

# 概要
- [[Global snapshot]]の取り方の話
- [[Stable Property]]の検出に役立つ