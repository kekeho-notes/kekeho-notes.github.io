- [[DID Method]]の一つ
- [[Verifiable Data Registry]]としてWebサーバーを使う
- 仕様: [https://w3c-ccg.github.io/did-method-web/](https://w3c-ccg.github.io/did-method-web/)
	- 2023年の時点ではまだドラフト(kekeho)

問題点
- DNS解決の真正性は?
	- DNSSEC
- PKIに乗っかっているという認識が必要そう(kekeho)
- VCでの利用を考えると、検証時にIssuerの運営するWebサーバー(Verifiable Data Registry)への問い合わせが発生するので、それってSelf-Sovereign Identityの思想的にどうなんすかという気持ちになる(kekeho)
