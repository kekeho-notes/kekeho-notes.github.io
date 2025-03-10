# プロセスのOmission fault
- プロセスがメッセージの送受信に失敗する

# ネットワークのOmission fault
- 通信リンクがメッセージを消失する

## 定理: Omissionに耐え、両プロセスが停止する決定性送信アルゴリズムは存在しない([[Two generals problem]], [[Coordinated attack problem]])
- プロセス$P$からプロセス$Q$へ、リンク$l$を介してメッセージ$m$を送信することを考える
- $l$は脱落故障を起こしメッセージが消失する可能性がある
- $P$はメッセージ$m$を繰り返し$Q$に送信することでOmission failureに耐えようとするが、いかなる時間上限$\delta$を設定したとしても(=[[Partially synchronous system]], [[Synchronous System]]?)全ての送信が失敗する可能性があるので、永遠に送り続ける必要がある
- $Q$はメッセージを受診したら返信$A_Q(m)$を返すことで、Pの送信をやめさせようとする
- $A_Q(m)$も繰り返し送り続ける必要がある...(Pが更に返答を返し、Qが更に返答を返し…無限ループ)
- 背理法: いつか解消されると仮定し最後に必要となるメッセージを$A_P A_Q ... A_Q(m)$とする。$P$はある回数だけ$A_PA_Q...A_Q(m)$を送信した後、終了する。送信された全ての$A_P A_Q ... A_Q(m)$が消失する可能性があるから、結局Qは $A_P A_Q ... A_Q(m)$ を受診しなくとも終了できることになる。すなはち、最後のメッセージ$A_P A_Q ... A_Q(m)$は不必要であることになり、矛盾が導かれる
### 参考
- [Some constraints and tradeoffs in the design of network communications](https://dl.acm.org/doi/abs/10.1145/800213.806523) ([[SOSP]]'75)