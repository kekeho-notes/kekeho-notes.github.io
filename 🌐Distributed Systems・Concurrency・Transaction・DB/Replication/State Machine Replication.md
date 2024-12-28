[#Replication](Replication)

- [[State Machine Approach]], [[SMR]]とも

Requirements
1. All servers start with the same initial state;
2. [[Total Order Broadcast]]: All servers receive the same sequence of requests as how they were generated from clients;
3. All servers receiving the same request shall output the same execution result and end up in the same state.

- [https://en.wikipedia.org/wiki/State_machine_replication](https://en.wikipedia.org/wiki/State_machine_replication)

![https://youtu.be/mlWOQuO55PE?si=cIAQLtdj4Br_Vqgb](https://youtu.be/mlWOQuO55PE?si=cIAQLtdj4Br_Vqgb)


- [[Total Order Broadcast]]が用いられる [#Broadcast](Broadcast.md)
	- [[Causal Broadcast]], [[Reliable Broadcast]], [[Best-effort Broadcast]]でも、状態遷移関数に仮定を置けば可能


# 論文
- Time, Clocks, and the Ordering of Events in a Distributed System by [[Leslie Lamport]]
- F. Schneider. Implementing Fault-Tolerant Services Using The State Machine Approach: A Tutorial. _ACM Computing Surveys_, 22(4), 1990.