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
- すべてのメッセージはsender name / virtual send time / name of receivber / virtual receive timeの4つのスタンプを持つ
	- つまり、メッセージというのは送信イベントと受信イベントの2点（送信者の場所・送信時間）, （受信者の場所, 受信時間）でスタンプされているといえる

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
	- Lamport clockは分散システムの特定の実行から開始し、その実行に対してかんぜんにじゅんじょづけ
# 論文
- [https://doi.org/10.1145/3916.3988](https://doi.org/10.1145/3916.3988)
- [[TOPLAS]]'1985