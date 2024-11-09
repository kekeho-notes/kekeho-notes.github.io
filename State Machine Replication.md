[#Replication](Replication)

- [[State Machine Approach]], [[SMR]]とも

Requirements
1. All servers start with the same initial state;
2. [[Total Order Broadcast]]: All servers receive the same sequence of requests as how they were generated from clients;
3. All servers receiving the same request shall output the same execution result and end up in the same state.

- [https://en.wikipedia.org/wiki/State_machine_replication](https://en.wikipedia.org/wiki/State_machine_replication)

[https://youtu.be/mlWOQuO55PE?si=cIAQLtdj4Br_Vqgb](https://youtu.be/mlWOQuO55PE?si=cIAQLtdj4Br_Vqgb)


![[assets/65b373c81cede700258595d1.png]]
- [[Total Order Broadcast]]が用いられる [#Broadcast](Broadcast)
	- [[Causal Broadcast]], [[Reliable Broadcast]], [[Best-effort Broadcast]]でも、状態遷移関数に仮定を置けば可能

