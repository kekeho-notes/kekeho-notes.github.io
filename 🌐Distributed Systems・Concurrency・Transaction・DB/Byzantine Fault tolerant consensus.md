---
aliases:
  - BFT Consensus
  - BFT Consensus Algorithm
  - Byzantine fault tolerant consensus algorithm
---

- [[Byzantine Fault Tolerant|BFT]]な[[Consensus algorithm]]
# 要件
- Termination: すべての非故障プロセスが出力を決定する
	- Every non-faulty process decides an output
- Agreement: すべての非故障プロセスは、最終的に同じ出力$\hat{y}$を決定する
	- Every non-faulty process eventually decides the same output $\hat{y}$
- Validity: 全てのプロセスが同じ入力$\hat{x}$で開始する場合、$\hat{y} = \hat{x}$となる。
	- If every process begins with the same input $\hat{x}$, then $\hat{y} = \hat{x}$
- Integrity: すべての非故障プロセスの決定とコンセンサス値$\hat{y}$は、何らかの非故障プロセスによって提案されたものでなければならない
	- Every non-faulty process’ decision and the consensus value ˆy must have been proposed by some nonfaulty process.
(定義は、Y. Xiao, N. Zhang, J. Li, W. Lou, and Y. T. Hou, “Distributed consensus protocols and algorithms,” Blockchain for Distributed Systems Security, p. 25, 2019. から [Google Books](https://books.google.co.jp/books?hl=ja&lr=lang_ja%7Clang_en&id=dhaMDwAAQBAJ&oi=fnd&pg=PA25&dq=%5B22%5D+Y.+Xiao,+N.+Zhang,+J.+Li,+W.+Lou,+and+Y.+T.+Hou,+%E2%80%9CDistributed+consensus+protocols+and+algorithms,%E2%80%9D+Blockchain+for+Distributed+Systems+Security,+p.+25,+2019.+&ots=QV_nf7Isiy&sig=svBkbHrTcozvAZU2kAlClYLW7rI&redir_esc=y#v=onepage&q&f=false))
