- [https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md](https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md)
[#chromium](chromium)

便利そうなリンク
- chrome://discards/graph
	- Processのツリーがグラフィカルに見れる
- chrome://process-internals/#web-contents
	- SiteInstanceとプロセスの一覧が見れる



Chromiumの設計
- 単一プロセスで動くブラウザの問題点
	- どこかのページのレンダリングでクラッシュしたら、ブラウザごとお亡くなりになる
	- 脆弱性があったら、違うオリジンのページのメモリを読み取られるかもしれない
- Chromiumは、プロセスをポコポコ立ち上げる方式
	- どこかがクラッシュしてもブラウザ全体に影響がないようになっている
	- セキュリティ的に堅牢

プロセスモデル
- Web上のどの部分が1つのプロセスに共存する必要があるかどうかを決定する必要がある。
	- ページ単位? オリジン単位(開いたミニウィンドウを同じプロセスで動かす?)? iframeは?
- Security Principal (SiteInfo)
	- Site(scheme + [[eTLD+1]])を指す
- Principal Instance (SiteInstance)
	- Chromiumのプロセスモデルの中核をなす単位。同じBrowsing Context Groupで同じPrincipalを持つものは、同じプロセスで動くべし
- Browsing Context Group (BrowsingInstance)
	- お互いに参照を持つタブ・フレーム。
	- 同じBrowsing Context Groupには、Principalごとに1つのPrincipal Instanceしか存在しない
- Mode
	- Full Site Isolation: Site per Process
		- デスクトップはこのモデル
	- Partial Site Isolation
		- Androidなど。リソース制約が大きいので、一部のサイトに対してのみLocked Processを作ってプロセス分離を行う。
		- 通常、Browsing Context GroupごとにUnlock Processが作られる。
		- どんなサイトをLocked Processに置くかはヒューリスティクスな手法できめる
	- No Site Isolation
		- メモリの少ないAndroid、iOSなど
	- Origin Isolation
		- Site単位ではなくOrigin単位

- プロセスは再利用されることがある

