- [[永続的データ構造]]とも
- それ自身が変更されても、常にその前のバージョンを保持するデータ構造
	- 連結リストとか
- [[Partially persistent]]: 半永続
	- 全てのバージョンにアクセスできるが、最新のバージョンしか変更できない
- [[Fully persistent]]: 全永続
	- 全てのバージョンにアクセスでき、変更も可能
- [[Confluently persistent]]: 2つ以上のバージョンをマージして新しいバージョンを得る

参考
- [https://www.geeksforgeeks.org/persistent-data-structures/](https://www.geeksforgeeks.org/persistent-data-structures/)
