- [https://ieee.nitk.ac.in/blog/merkle-trees-and-their-application-in-git/](https://ieee.nitk.ac.in/blog/merkle-trees-and-their-application-in-git/)
- [https://qiita.com/noshishi/items/60a6fe7c63097950911b](https://qiita.com/noshishi/items/60a6fe7c63097950911b)

[#Merkle_Tree](Merkle_Tree) [#Git](Git)

![[assets/643a3e773b544d001ced5953.png]]

- Gitオブジェクトの種類
	- [[Blob]]
		- ファイルデータ
	- Tree
		- 1つのディレクトリ内のすべてのファイルについて，Blob ID, パス名, メタデータを記録
		- 下位ディレクトリへの参照
	- Commit
		- 作者・コミット日・コミットメッセージなど
		- コミット時点でのリポジトリの状態を指す[[Merkle Tree]]のルートハッシュ
	- Tag
- Gitのすべてのファイルは[[Blob]]として保存されている
	- 同じハッシュ値を持つ(=同じデータの)Blobは存在しない(させない)
- 各コミットオブジェクトは以下のポインタを持つ
	- 前のコミットを指すポインタ
	- [[Merkle Tree]]のルートハッシュ
- Pull/Pushのとき，ハッシュ値を比較して違うとこだけ転送する
