[#Flutter](Flutter.md)
- [[Flutter]]の状態管理パッケージ

- [[Provider]]の種類
	- [[Provider]]: 基本
		- 外部からは変更できない値を公開できる基本的なProvider
		- 別のProvider(他の種類含む)の値を加工して別の値にして返すこともできる
			- `ref.watch(provider).when`
	- [FlutureProvider](https://pub.dev/documentation/riverpod/latest/riverpod/FutureProvider-class.html): 非同期で取得した値を提供
		- 非同期関数の実行が終わったらWidgetを再構築する
		- 実行中・エラーのハンドリングもできる
	- [StreamProvider](https://pub.dev/documentation/riverpod/latest/riverpod/StreamProvider-class.html): 徐々に値を返して再描画
	- [[NotifierProvider]]: 外部から変更可能な状態・状態操作メソッドを提供
	- [[AsyncNotifierProvider]]: 非同期な状態操作・ステート
	- [[ChangeNotifierProvider]]
- Code Generation: [About code generation | Riverpod](https://docs-v2.riverpod.dev/docs/concepts/about_code_generation)
	- `dev_dependencies`に`build_runner`, `riverpod_generator`が必要
	- `dart run build_runner build`でコード生成
- `Consumer`([Docs](https://riverpod.dev/docs/concepts/reading#consumer))でStatelessWidget内で使ったり、再構築の範囲を制限して最適化したりできる
- リアクティブなUIを作りたいときは`ref.watch`
- 一度だけ値を取得したいときは`ref.read`
- 状態が変更されたときに何らかの動作をしたい場合は`ref.listen`(購読ができる)
- 特定の条件下で再構築したい場合は`provider.select`([参考](https://zenn.dev/riscait/books/flutter-riverpod-practical-introduction/viewer/select))
参考
- [https://riverpod.dev/ja/](https://riverpod.dev/ja/)
- [Flutter x Riverpod でアプリ開発！実践入門](https://zenn.dev/riscait/books/flutter-riverpod-practical-introduction)

