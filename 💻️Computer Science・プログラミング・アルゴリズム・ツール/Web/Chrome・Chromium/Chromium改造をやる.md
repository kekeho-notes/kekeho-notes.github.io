[#chromium](chromium)

参考リンク
- [Life of a Chromium Developer](https://docs.google.com/a/google.com/presentation/d/1abnqM9j6zFodPHA38JG1061rG2iGj_GABxEDgZsdbJg/)
- [Design Doc](https://www.chromium.org/developers/design-documents/)
- [[Chromiumのプロセスモデル]]
- [https://source.chromium.org/chromium/chromium/src/+/main:](https://source.chromium.org/chromium/chromium/src/+/main:)
- [https://www.chromium.org/developers/how-tos/getting-around-the-chrome-source-code/](https://www.chromium.org/developers/how-tos/getting-around-the-chrome-source-code/)
- [For Developers](https://www.chromium.org/developers/)


- 環境
	- Ubuntu 22.04 (Linux)
	- Intel Core i5-1240P
	- RAM: 16GB
- Editor: VSCode
- Chromium Version: 115.0.5736.1

作業ログ
事前知識をつける
- Life of a Chromium Developerを読んだ
- Design Docを軽く眺めた

Build
- mainはbuggyだったので、バージョンを別のやつに切り替え (tag: 115.0.5736.1)
- Build
	- [https://chromium.googlesource.com/chromium/src/+/main/docs/linux/build_instructions.md](https://chromium.googlesource.com/chromium/src/+/main/docs/linux/build_instructions.md)
		- とりあえず↑をそのままやればOK．
		- デバッグオプションを付ける
			- `chromium/src/out/<Build Directory>/args.gn`に`is_debug=true`を書き込む
				- 参考: [https://www.chromium.org/developers/gn-build-configuration/](https://www.chromium.org/developers/gn-build-configuration/)
		- chromiumのバージョンを指定してビルドする
			- `git checkout refs/tags/[TAG]`
			- git checkout後は`gclient sync`をしたほうがいいっぽい
			- tag一覧: [https://chromium.googlesource.com/chromium/src.git/+refs](https://chromium.googlesource.com/chromium/src.git/+refs)
		- RAM 16GBだとOOMでKillされたので、swap領域を追加で16GBほど確保した
	- DONE
		- ![[assets/6453db54cf98f3d9e5a8f56f.png]]

Editorのセットアップ
- [Chromium Docs - Visual Studio Code Dev](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/vscode.md#setup)
	- その他のエディタ向けの設定は[For Developers](https://www.chromium.org/developers/)のEditors Guidesに書いてある
