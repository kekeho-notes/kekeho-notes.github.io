[https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html)

- Badgeという形で、業績情報をパッケージ化して画像ファイルに埋め込み
	- [[JSON-LD]]による[[Linked Data]]が埋め込まれる
- Core Data Class
	- Assertions: 授与されたバッジの表現
	- BadgeClasses: OpenBadgeによって認識される、成果に関する情報の集まり。1つのBadgeClassに対応する多くのAssertionsを作成できる
	- Profiles: OpenBadgeを使用するエンティティ・組織を記述する情報の集まり。IssuerはProfileとして表現されなければならない(その他のエンティティもこれで表せる)。
- バッジの種別(VerificationObjectのサブクラス)
	- Hosted Badge
		- AssertionsをIssuerがHostする? Badge bakingした場合画像もIssuerがホスト?
			- えー?(kekeho)
	- Signed Badge
- Verificationの方法: [https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#HostedBadge](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#HostedBadge)
