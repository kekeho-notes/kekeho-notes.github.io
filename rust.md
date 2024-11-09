- 入門: [https://doc.rust-jp.rs/book-ja/ch04-02-references-and-borrowing.html](https://doc.rust-jp.rs/book-ja/ch04-02-references-and-borrowing.html)
- 初学者がつまりがちポイント: [https://zenn.dev/hirotosuzuki/articles/8b3ef08e2d67be](https://zenn.dev/hirotosuzuki/articles/8b3ef08e2d67be)
- Future(async/await)周り: [https://blog.tiqwab.com/2022/03/26/rust-future.html](https://blog.tiqwab.com/2022/03/26/rust-future.html)
- 問題集: [https://github.com/rust-lang/rustlings](https://github.com/rust-lang/rustlings)


- [[Box]], [[Arc]], [[Rc]]の違い
	- Boxはclone時に値がコピーされる
	- Rcは所有権の共有ができる。cloneされるとポインタだけがコピーされ、参照カウンタが増える
		- [[スレッドセーフ]]ではない。参照カウンタのインクリメント・drop時のデクリメント操作が[[Atomic]]ではない
	- ArcはRcとほぼ一緒だが、参照カウンタのインクリメント・デクリメントが[[atomic]]なので[[スレッドセーフ]]
