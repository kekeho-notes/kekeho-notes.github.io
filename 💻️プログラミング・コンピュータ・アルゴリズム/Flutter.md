- [[Dart]]でマルチプラットフォームGUIアプリが作れる[[SDK]]
	- [[iOS]], [[Android]], [[macOS]], [[Windows]], [[Linux]](Gtk), [[Web]]

- プロジェクトを作成: `flutter create --project-name my_app --org dev.flutter --android-language kotlin --ios-language swift my_app`
- 動かす: `flutter run`
	- 特定のデバイスで動かす
		- device一覧: `flutter devices`
			- iOSのSimulatorで動かしたい場合は、予め起動しておく
		- `flutter run -d [device id]`

Widget
- 画面の構成単位
	- [StatefulWidget](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html): ステートを持つ
	- [StatelessWidget](https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html): ステートを持たない
- ウィジェットカタログ
	- [https://docs.flutter.dev/ui/widgets](https://docs.flutter.dev/ui/widgets)

State Management
- Ephemeralなステートと、App Stateがある(前者はウィジェット内で完結)
- App Stateの管理
	- [[provider (flutter)]]

Devtool
- Widget Inspectorでウィジェットツリーを見たり、レイアウトの確認ができる
- メモリマップみたり、ネットワークみたり、などもできる
- 実機プロファイラとかも使えるみたい

Test
[[Flutter テスト]]
- Unit TestとWidget Test、Integration Testがある
- Widget Test: 仮想的にウィジェット画面を構築し、色々テストする
- Integration Test: 実際にエミュレータで動かしてテスト

C FFI
- [[ffigen]]でBindingが作れる
	- ffigen.yaml: [https://pub.dev/packages/ffigen#configurations](https://pub.dev/packages/ffigen#configurations)
		- `flutter pub run ffigen --config ffigen.yaml`
	- Tutorial: [https://codelabs.developers.google.com/codelabs/flutter-ffigen?hl=ja#0](https://codelabs.developers.google.com/codelabs/flutter-ffigen?hl=ja#0)
- Dart FFI: [[Dart FFI]]
- 基本的にはPluginを作る、という感じぽいなぁ(kekeho)
	- `flutter create --template=plugin_ffi --platforms=android,ios,linux,macos,windows ffigen_app`
- iOS
	- [https://docs.flutter.dev/platform-integration/ios/c-interop](https://docs.flutter.dev/platform-integration/ios/c-interop)
- Android
	- [https://docs.flutter.dev/platform-integration/android/c-interop](https://docs.flutter.dev/platform-integration/android/c-interop)

Rust FFI
- [https://github.com/fzyzcjy/flutter_rust_bridge](https://github.com/fzyzcjy/flutter_rust_bridge)
	- 中身的には共有ライブラリ使っているぽい
	- マジでよくできている(kekeho)

i18n
[[flutter i18n]]
- [https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization](https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization)
- [[arb]]ファイルの記法
	- [https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification](https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification)
- arbファイルを書き換える度に、そこからdartファイルを生成する必要がある
	- 都度`flutter pub get`をすれば自動で生成される

Plugin
- [https://docs.flutter.dev/packages-and-plugins/developing-packages](https://docs.flutter.dev/packages-and-plugins/developing-packages)

デフォルトディレクトリの取得
- [https://pub.dev/packages/path_provider](https://pub.dev/packages/path_provider)
