---
aliases:
  - 同期システム
  - 同期モデル
---
1. Two separate clock readings yield different values
2. chrocks are $\varepsilon$-synchronized: 任意の実時間$t$において、2つのプロセッサ$p, q$のクロックのズレは最大でも$\varepsilon$である
3. 伝送遅延・処理遅延は既知の定数$\delta$に制限される

- 現実には同期システムなどほとんどない
- authenticationができれば[[Byzantine fault]]なノードがN個いても(つまり任意の数の障害に)耐えられるコンセンサスプロトコルがあることが知られている
	- authenticationがなければ$N \geq 3t+1$
	- 