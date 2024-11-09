[#Verifiable_Credential](Verifiable_Credential)
- [[Veramo]]の謎仕様Proof Type。
	- ドキュメントらしいものが見当たらない。登録されていないProof Typeだと書かれている。
	- [ここ](https://veramo.io/docs/cli_tutorials/cli_create_vc/)と[ここ](https://github.com/decentralized-identity/veramo/discussions/571)に言及がある
- proof.jwtフィールドに、jwtが含まれている。Credential自体がjwtに含まれている。

検証方法
- [[jose]]とかにvcdata.proof.jwtを渡すと、簡単にverifyできる
- jwtのvcフィールドに書いてあるcredentialの内容と、vcに書いてある内容が一致しているか、別途バリデーションが必要そう?
```verify.js
import { readFile } from 'fs';
import { jwtVerify, importJWK } from 'jose';

const vcfile = 'samplevc.json';
const jwk = {
    "kty": "OKP",
    "crv": "Ed25519",
    "x": "(略)"
}

readFile(vcfile, 'utf-8', async (err, data) => {
    if (err) {
        console.error('ファイル読み込みエラー', err);
        return;
    }

    let vcdata = JSON.parse(data);
    let jwt = vcdata.proof.jwt;

    // 失敗するとJWSSignatureVerificationFailedがthrowされる
    let { payload, protectedHeader } = await jwtVerify(jwt, await importJWK(jwk), {
        algorithms: ['EdDSA']
    })
    console.log(payload);
    console.log(protectedHeader);
})
```
