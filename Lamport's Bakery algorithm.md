- [[Mutex]]を実現する[[Lock]]アルゴリズムの一つ
- [[Deadlock-freedom]], [[Starvation-freedom]], [[Mutex]], [[Fairness]]を保証している
# イメージ
- 各スレッドは、整理券を取って[[Critical section]]の前で並ぶ
- 自分の番号より小さいやつが[[Critical section]]にいなくなったら、[[Critical section]]に入る
## Pseudo code
```java
class Bakery implements Lock {
	boolean[] flag;
	Label[] label;
	
	public Bakery (int n) {
		flag = new boolean[n];
		label = new Label[n];
		for (int i = 0; i < n; i++) {
			flag[i] = false; label[i] = 0;
		}
	}

	public void lock() {
		int i = ThreadID.get();
		flag[i] = true;
		label[i] = max(label[0], ..., label[n-1]) + 1;  // 整理券取得
		while ((exists k != i)(flag[k] && (label[k],k) << (label[i],i))) {};
	}
	
	public void unlock() {
		flag[ThreadID.get()] = false;
	}
}
```

- 整理券習得のときは、label配列のスナップショットを取る
- `(label[k],k) << (label[i],i)`の意味: まずはラベルで比較して、一緒だったらプロセスIDで比較
	- これにより、整理券を取得するところで同じIDを手に入れても、大丈夫
- ラベルが[[Timestamp]]の役割を果たしている
- ラベルがオーバーフローしたら詰むことに注意

# 注意
- n個のラベルフィールドを使わないといけないので、[[空間計算量]]があまりよくない。あまり使われていない。