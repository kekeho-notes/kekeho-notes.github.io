---
aliases:
  - DLS88
---
- [[Partially synchronous system]]におけるコンセンサスについて論じた論文

# 概要
- [[Partially synchronous system#モデル|部分同期システムのモデルには2種類ある]]
- 部分同期システムにおける耐障害性のある[[Consensus algorithm|コンセンサスアルゴリズム]]を考えたンゴ


# Introduction
## Partially Synchronous Communication
- プロセッサが完全に同期的(例えば$\phi = 1$)、通信が同期と非同期の間にある場合、少なくとも2つの自然な形態がある
	- $\delta$は存在しているが事前にそれを知ることがない
		- これだけで[[FLP Impossibility]]の制約から外れることができる
		- $\delta$を適当な値に設定しておいて、それを超えたら障害があるとみなすことができるかも知れないが(タイムアウト検知)、$\delta$を小さくしすぎるとすぐ故障しているとみなされてしまう。[[Consensus algorithm#Consensus algorithmのcorrectness]]としては問題ないかもしれないが、それでは少し遅延の大きいノードの提案はいつまでも採用されない
		- 我々が求めているのは、$\delta$がわからなくてもワークするプロトコル
	- $\delta$は知っているが、メッセージシステムがunreliableでメッセージの配信が送れたりする
		- 各実行に対して、プロセッサには未知のGlobal Stabilization Time (GST)が存在する
		- GSTからの$\delta$がかかる

# 参考
- [Consensus in the presence of partial synchrony](https://dl.acm.org/doi/10.1145/42282.42283) ([[JACM]]'88)