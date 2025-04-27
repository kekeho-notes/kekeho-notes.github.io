---
aliases: 
tags:
  - 論文
keywords:
  - Logical Time
  - Logical Clock
authors:
  - David R. Jefferson
---
- [[分散システム]]における独自の下層時間を定義
- [[TimeWarp]]メカニズム: virtual timeを実装
	- [[Lockahead-rollback]]という基礎的な同期メカニズムに依存している

# Virtual Time
- Virtual Time Systemは、Virtual timeを進めるVirtual clockと協調する分散システムである
- Virtual Timeは、グローバルの1次元の時間であり、計算の進みを測定し、同期を定義するために使用される
	- 実数値を取る（正の無限の値`+inf`を持つ）
	- Total orderが可能（`<`関係が定義される）
	- 実時間とは関係ないスピードで常に進行する（逆行しない）

- 分散システム上の各プロセスは、virtual space上の点として表現される
- すべてのプリミティブなaction（値の変更、メッセージの送信）はvirtual time座標とvirtual space座標の両方を持つ
	- 同じvirtual place `x`と同じvirtual time `t`で行われるすべてのactionの集合を`(x, t)`におけるeventと呼ぶ
- すべてのメッセージはsender name / virtual send time / name of receiver / virtual receive timeの4つのスタンプを持つ
	- つまり、メッセージというのは送信イベントと受信イベントの2点（送信者の場所・送信時間）, （受信者の場所, 受信時間）でスタンプされているといえる
	- 受信時刻は、送信者が受信されるべき時刻を決める

- Virtual time systemは2つの基本的なルールに従う（[[Lamport Clock]]と同じ）
	- ルール1: 各メッセージのvirtual send timeは、virtual receive timeよりも小さくないといけない
	- ルール2: プロセス内の各イベントのvirtual timeは、同一プロセス内の次のイベントのvirtual timeより小さくなければいけない 
- 上記のルールにより、任意の1つのプロセスから送られるすべてのメッセージは、virtual send timeの順に送信され、任意の1つのプロセスが受け取るすべてのメッセージは、virtual receive timeの順に読み出されることを意味する

- `(x, t)`におけるイベントは、決定論的な逐次計算であり、以下の操作を0個以上含む
	1. `x`は、自身が受信者となっている任意の数のメッセージを受信し、その内容を読むことができる
	2. virtual timeを読むことができる
	3. 状態変数を更新することができる
	4. 任意の数のメッセージを送信することができる。メッセージの送信時刻はtでタイムスタンプされる
- イベントAがイベントBを引き起こす(cause)というのは、[[happend-before]]関係で定義される
- 上記を踏まえ、Virtual Timeの実装にあたっての制約は以下のシンプルな言葉で言い表せる
	> あるイベントAがイベントBを引き起こす（cause）場合、実時間でBが始まる前にAが完了するようにスケジューリングされないといけない
	- イベントAがイベントBよりもVirtual timeが早いにもかかわらず、AからBへの因果関係（の連鎖）がない場合はBよりAを先に実行する必要性がないことに注意
- [[Lamport Clock]]との違い
	- Lamport clockは分散システムの特定の実行から開始し、その実行に対して完全に順序付けられたクロック値の割当をする
	- Virtual TimeではLamport clockの逆で、全てのイベント（メッセージ含む）にはLamport clockの条件を満たすタイムスタンプがラベルとしてあらかじめ貼られることを保証する
	- 楽観的に実行し、問題があればあとから事後的に修正
# Time Warp
- 通信路は[[Reliable link]]であると仮定（順序保証はなし）
- Local Control mechanism, Global control mechanismに分けられる
## Local Control mechanism
- 各プロセスは独自のlocal virtual clock値を持つ
	- イベント中には変化せず、イベントとイベントの間に変化する
	- 入力キューの次のメッセージの受信タイムスタンプの値にのみ変化する
	- 各プロセスは、自身のlocal virtual clock（Local Virtual Time: LVT）しか読めない
- とりあえずどんどん実行していくが、古い受信時刻を持つメッセージが来たらロールバックする
- look-ahead（先読み）実行をしているということ
## Anti-messages and the Rollback Mechanism
- ロールバックの仕組み
- プロセスの実行時表現は以下で構成される
	1. process name (virtual space座標)はシステム中でユニーク
	2. local virtual clock (virtual time座標)時にメッセージが受理されている
		- 図1では162となっている
	3. Stateは、実行スタック・ローカル変数、プログラムカウンタなどを含む
	4. State Queue: プロセスの最近のStateのコピーを保存しているキュー。
	5. Input Queue: ロールバックするかもしれないので、入力メッセージを消さずに取っておく。Signが+。
		- 同じメッセージの+と-が両方入ってきたら打ち消し合う。[[Strong Convergence]]を満たすということかな?
	6. Output Queue: 最近送信したメッセージを取っておく。Unsend（取り消しメッセージ）を実現するため。Signが-なのは、Unsendという意味。

![[Pasted image 20250427222030.png]]

## Global Control Mechanism
- Global Virtual Time (GVT) は、実時間rにおけるシステムのグローバルスナップショットで、以下に定義される
	>  実時間rにおけるGVTは、（1）実時間rにおけるすべての仮想時間（LVT?）と（2）実時間rにおいて送信されたがまだ処理されていないすべてのメッセージのvirtual send timeの最小値
	- Virtual receive timeではなくsend timeで定義されることに注意
- 個々のLVTは頻繁にロールバックするにも関わらず、GVTは増加し続けることはメッセージ通信actionの数に対する帰納として簡単に示される（これなに?）
- GVTは、どんなプロセスもロールバックすることのできるvirtual timeのfloorとして機能する
	- GVTより前のやつは、キューから捨てていい
- GVTがどのような値か瞬時に知ることはできないが、estimationはできる
	- スナップショット内のすべてのvirtual clock内のvirtual time, まだ応答を得ていないvirtual send time、入力Queueのメッセージのvirtual send timeの最小値以下であることはわかる
	- よくわからないけどいくつかアルゴリズムがあるらしい

# 論文
- [https://doi.org/10.1145/3916.3988](https://doi.org/10.1145/3916.3988)
- [[TOPLAS]]'1985