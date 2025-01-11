---
tags:
  - 論文
authors:
  - Maurice P. Herlihy
  - Jeannette M. Wing
keywords:
  - "[[Linearizability]]"
URL: https://doi.org/10.1145/78969.78972
---

# 書誌情報
- **タイトル**: Linearizability: a correctness condition for concurrent objects
- **著者**: Herlihy, Maurice P.,Wing, Jeannette M.
- **出版年**: 1990
- **Abstract**:
  A concurrent object is a data object shared by concurrent processes. Linearizability is a correctness condition for concurrent objects that exploits the semantics of abstract data types. It permits a high degree of concurrency, yet it permits programmers to specify and reason about concurrent objects using known techniques from the sequential domain. Linearizability provides the illusion that each operation applied by concurrent processes takes effect instantaneously at some point between its invocation and its response, implying that the meaning of a concurrent object's operations can be given by pre- and post-conditions. This paper defines linearizability, compares it to other correctness conditions, presents and demonstrates a method for proving the correctness of implementations, and shows how to reason about concurrent objects, given they are linearizable.
