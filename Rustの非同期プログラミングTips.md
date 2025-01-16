- [[Rust]]の[[非同期プログラミング]]のTipsをまとめる

# ランタイム
- [[tokio]]が有名・デファクトスタンダード

# Tips
## 複数のタスクのうち、どれかk個終わったら抜ける
- `JoinSet`で実現できる: https://docs.rs/tokio/latest/tokio/task/join_set/struct.JoinSet.html
