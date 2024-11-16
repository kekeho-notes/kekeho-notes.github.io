- [[Multiprocessor Programming]]において、スレッドが[[Lock]]しないことを意味していて、すべてのステップにおいてシステムがかならず進行することを保証する
- [[Non-blocking]]アルゴリズムによりクリティカルセクションを最小化する
	- [[Mutex]]を使わない
- システムが必ず進行するので、[[Deadlock]]も[[Livelock]]も避けることができる

- ロックされた空間([[Critical section]])がそれなりの割合であると、[[アムダールの法則]]が効いてきて並列化の恩恵を受けづらくなるので、Lock freeは大切



# 参考
- kumagiさんの解説: [lockfree門 | ドクセル](https://www.docswell.com/s/kumagi/ZP99EQ-lock-free)