[#macOS](macOS) [#Swift](Swift)
- [[Input Method Kit]]とも
- macOSの[[Input Method]]用ライブラリ
- とにかくドキュメントがない(kekeho)

参考資料
- [日本語入力を作るときに必要だった本](https://booth.pm/ja/items/809262)
	- IMKitでIMEを作ってみる本
	- Swift対応
	- チュートリアルとして大変良くできている本。最新のIMKit情報が詰まっている。神本といえる。まずはこれを読むべき。(kekeho)
- 公式ドキュメント
	- InputMethodKit: [InputMethodKit | Apple Developer Documentation](https://developer.apple.com/documentation/inputmethodkit)
	- [[IMKTextInput]]: オンラインドキュメントがないので、大人しくヘッダファイルを読みましょう。
		- 一部はNSTextInputClientと共通しているので、そのドキュメントも参考になる
	- [[NSTextInputClient]]: [NSTextInputClient | Apple Developer Documentation](https://developer.apple.com/documentation/appkit/nstextinputclient)
		- Client側
	- [Input Method Kit Release Note for OS X v10.5](https://developer.apple.com/library/archive/releasenotes/Cocoa/RN-InputMethodKit/index.html#//apple_ref/doc/uid/TP40004740)
- Info.plistの書き方
	- [https://github.com/google/mozc/blob/master/src/mac/Info.plist](https://github.com/google/mozc/blob/master/src/mac/Info.plist)
		- [[Mozc]]の例
	- [https://github.com/rime/squirrel/blob/master/Info.plist](https://github.com/rime/squirrel/blob/master/Info.plist)
		- [[Rime]]の例
- その他
	- [Technical Q&A QA1644: How do I add annotations to my IMKit Input Method](https://developer.apple.com/library/archive/qa/qa1644/_index.html#//apple_ref/doc/uid/DTS40009583)
		- 変換候補にアノテーションをつける
		- どうも動かないらしい: [https://openradar.appspot.com/34911503](https://openradar.appspot.com/34911503)

実装例
- [[GyaimMotion]]: 増井先生による実装
	- 公式サイト: [https://masui.github.io/GyaimMotion/](https://masui.github.io/GyaimMotion/)
	- GitHub: [https://github.com/masui/GyaimMotion](https://github.com/masui/GyaimMotion)
- [[Mozc]]: Google日本語入力のOSS版
	- Objective-Cによる実装
	- GitHub: [https://github.com/google/mozc/tree/master/src/mac](https://github.com/google/mozc/tree/master/src/mac)
- [[AquaSKK]]
	- GitHub: [https://github.com/t-suwa/aquaskk](https://github.com/t-suwa/aquaskk)
- [NumberInput_IMKit_Sample](https://developer.apple.com/library/archive/samplecode/NumberInput_IMKit_Sample/Introduction/Intro.html#//apple_ref/doc/uid/DTS40007466-Intro-DontLinkElementID_2)
	- Appleのサンプルコード (Objective-C)
	- かなり古い。色々動かなくなってる気がする(kekeho)

Tips
- IMKCandidatesは色々と壊れている(# ﾟДﾟ)
	- 参考: [Input Method Kit (IMKit) Apple Radars and Bug Reports · Issue #2 · pkamb/NumberInput_IMKit_Sample · GitHub](https://github.com/pkamb/NumberInput_IMKit_Sample/issues/2)
	- 結局、しっかりしたIMEを作ろうと思うと自前で候補リストを描画する羽目になる(kekeho)
		- Cocoa何もわからない民としては、WKWebViewとかで作るのがラクそう(kekeho)
- カーソルの画面上の位置(座標)を知りたい
	- たとえば、自作変換候補ウィンドウをカーソルのそばに表示したいときなど
	- 方法1: この方法は一部のネイティブCocoaアプリケーションでしか動作しないので、方法2推奨
		- クライアント(IMKTextInput)のselectedRangeを取得して、それをNSRectに変換することでx, y, w, hが取得できる(kekeho)
		- ```sample.swift,			class HogeController: IMKInputController {
				...省略
				func getCursorPos() -> NSRect {
					let selectedRange = self.client().selectedRange()
					return self.client().firstRect(forCharacterRange: selectedRange, actualRange: nil)
				}
			}
			```
	- 方法2
		- クライアント(IMKTextInput)のattributes関数を呼びだし、カーソルの位置を取得
		- ```sample.swift,			func getCursorPos() -> NSRect {
				var p: NSRect = NSRect(x: 0, y: 0, width: 0, height: 0)
			    self.client().attributes(forCharacterIndex: 0, lineHeightRectangle: &p)
			    return p
			}
			```
		- 参考(GyaimMotion): [https://github.com/masui/GyaimMotion/blob/0eab00612afe1e3a313bb34b205e14667efdc7d4/app/GyaimController.rb#L310](https://github.com/masui/GyaimMotion/blob/0eab00612afe1e3a313bb34b205e14667efdc7d4/app/GyaimController.rb#L310)
- `insertText(_ string: Any!, replacementRange: NSRange)`の仕様
	- 文字の置換(挿入)
	- string: String, NSString, NSAttributedStringなど
	- replacementRange: NSRange位置のテキストを置換する
		- locationがNSNotFoundの場合: カーソル位置指定
		- lengthがNSNotFoundの場合: Not置換、挿入になる
- `setMarkedText(_ string: Any!, selectionRange: NSRange, replacementRange: NSRange)`の仕様
	- 未確定文字列の置換(挿入)
	- string: String, NSString, NSAttributedStringなど
- 未確定文字列の一部を選択(色付け)するには? (変換候補選択などで"となりのいぬ"の"いぬ"だけを色付けしたいときがある)
	- こういう感じのをつくりたいとき:
		- ![[assets/64f7a2bd8f035f001c4a0056.png]]
	- AttributedStringをつかってハイライトをつける
	- これが参考になる: [https://github.com/google/mozc/blob/f3514b090743d23fdcc6824b7af4be4acda283fb/src/mac/GoogleJapaneseInputController.mm#L679](https://github.com/google/mozc/blob/f3514b090743d23fdcc6824b7af4be4acda283fb/src/mac/GoogleJapaneseInputController.mm#L679)
	- Swiftで書くとこんな感じ
		- ```swift,			let texts = ["となりの", "いぬ"]
			let hIdx = 0  // ハイライトしたいインデックス。「となりの」だけをハイライトしたい
			
			let attrMarkedText = NSMutableAttributedString()
			
			for (i, text) in texts.enumerated() {
			    let attrText = NSMutableAttributedString(string: text)
			    let attr: [AnyHashable: Any]
			    if i == hIdx {
			        // Hilight
			        attr = self.mark(forStyle: kTSMHiliteSelectedConvertedText, at: NSMakeRange(0, NSNotFound))
			    } else {
			        // Underline
			        attr = self.mark(forStyle: kTSMHiliteConvertedText, at: NSRange(location: 0, length: attrText.length))
			        
			    }
			    if let attr = attr as? [NSAttributedString.Key : Any] {
			        attrText.addAttributes(attr, range: NSRange(location: 0, length: attrText.length))
			    }
			    attrMarkedText.append(attrText)
			}
			
			self.client().setMarkedText(attrMarkedText, selectionRange: cursorPosition, replacementRange: cursorPosition)
			```
- 自前で変換候補ウィンドウを作って表示するときの[NSWindow](https://developer.apple.com/documentation/appkit/nswindow)
	- [styleMask](https://developer.apple.com/documentation/appkit/nswindow/stylemask)を[.borderless](https://developer.apple.com/documentation/appkit/nswindow/stylemask/1644698-borderless)にするとそれっぽい
	- NSWindowの[level](https://developer.apple.com/documentation/appkit/nswindow/1419511-level)は、[.popUpMenu](https://developer.apple.com/documentation/appkit/nswindow/level/1419344-popupmenu)にするとよい
		- [Mozcの実装もそうなっている](https://github.com/google/mozc/blob/f3514b090743d23fdcc6824b7af4be4acda283fb/src/renderer/mac/CandidateController.mm#L112C31-L112C31)
		- [.floating](https://developer.apple.com/documentation/appkit/nswindow/level/1419352-floating)では足りないケースがある: SpotlightやLaunchpadのテキストエリアはもっと上に位置しているので、下に隠れてしまう
- 連続的にclientのinsertTextを追記で呼び出すと、たまに文字が吹き飛ぶ・前後する
	- ```code,		let range = NSRange(location: NSNotFound, length: NSNotFound)  // 追記
		for c in "ABCDEFGHIJKLMNOPQRSTUVWXYZ" {
			self.client().insertText(String(c), replacementRange: range)
		}
		// クライアントアプリの画面に表示される文字列は「AGHDEFIJKLMNOPQRSTUVWXYZ」みたいなことになる
		```
	- クライアントも非同期的に処理していると思われる(kekeho)
	- ある程度はまとめて書き込んでやったほうがよさそう(kekeho)
	- [[OT]]のテクニックが使えないか？

謎
- MacのChromeでGoogle Docsを開くと、変換候補ウィンドウの位置が狂う
	- Google日本語入力やAppleの純正IMEでもそうなる
