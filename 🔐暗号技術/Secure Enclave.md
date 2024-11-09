- Appleの[[セキュアエレメント]]

参考
- [https://support.apple.com/ja-jp/guide/security/sec59b0b31ff/web](https://support.apple.com/ja-jp/guide/security/sec59b0b31ff/web)
- [[CryptoKit Security]]にも参考文献をいくつか載せた(kekeho)
- [[Apple Platform Security]]

サンプル実装
TPMで秘密鍵管理
- EntitlementのKeychain Access Groupsに`$(AppIdentifierPrefix)[あなたのBundle Identifierの文字列]`を書いておく必要がある
```test.swift
import Foundation
import CryptoKit
import Security

@main
class KeyTestApp {
    static func main() {
        // Secure Enclaveが使えるかチェックする
        let isSecureEnclaveAvailable: Bool = SecureEnclave.isAvailable
        if !isSecureEnclaveAvailable {
            NSLog("No Secure enclave...")
            exit(1)
        }
        NSLog("Secure Enclave is detected")



        // アクセス権限の設定
        let access = SecAccessControlCreateWithFlags(kCFAllocatorDefault, kSecAttrAccessibleWhenUnlockedThisDeviceOnly, .privateKeyUsage, nil)!


        // 鍵のAttributesの設定
        let attributes: NSDictionary = [
            kSecAttrKeyType: kSecAttrKeyTypeECSECPrimeRandom,
            kSecAttrKeySizeInBits: 256,
            kSecAttrTokenID: kSecAttrTokenIDSecureEnclave,  // ここでSecure Enclaveに格納されることを指示
            kSecPrivateKeyAttrs: [
                kSecAttrIsPermanent: false,  // これがtrueだと、ちゃんとOSのキーチェーンに保存される?
                kSecAttrApplicationTag: "UNKO".data(using: .utf8)!,
                kSecAttrAccessControl: access,
            ],
        ]


        // Secure Enclave内に秘密鍵を生成・公開鍵の導出
        var error: Unmanaged<CFError>?
        guard let privateKey: SecKey = SecKeyCreateRandomKey(attributes, &error) else {
            NSLog(error!.takeRetainedValue().localizedDescription)
            exit(1)
        }
        let pubKey: SecKey = SecKeyCopyPublicKey(privateKey)!;


        // サポートチェック
        if !SecKeyIsAlgorithmSupported(pubKey, .encrypt, .eciesEncryptionStandardX963SHA256AESGCM) {
            NSLog("暗号化できない")
            exit(1)
        }
        if !SecKeyIsAlgorithmSupported(privateKey, .decrypt, .eciesEncryptionStandardX963SHA256AESGCM) {
            NSLog("復号できない")
            exit(1)
        }
        


        // 暗号化
        let data: Data = "Hello, Secure Enclave!".data(using: .utf8)!
        var encryptError: Unmanaged<CFError>?
        let encryptedData: Data = SecKeyCreateEncryptedData(pubKey, .eciesEncryptionStandardX963SHA256AESGCM, data as CFData, &encryptError)! as Data

        if let encryptError = error {
            NSLog(encryptError.takeRetainedValue().localizedDescription)
            NSLog("暗号化に失敗")
            exit(1)
        }

        // 復号
        var decryptError: Unmanaged<CFError>?
        let decryptedData: Data = SecKeyCreateDecryptedData(privateKey, .eciesEncryptionStandardX963SHA256AESGCM, encryptedData as CFData, &decryptError)! as Data
        if let decryptError = error {
            NSLog(decryptError.takeRetainedValue().localizedDescription)
            NSLog("復号に失敗")
            exit(1)
        }

        print("Result: ")
        print(String(data: decryptedData, encoding: .utf8)!)  // ちゃんとHello, Secure Enclave!と表示されるはず
    }
}

```

その他実装例
- Kryptonite iOS
	- [https://github.com/kryptco/krypton-ios/blob/82787da9d72a297c5ccc4bb73ff26d7a89e1f5e8/Krypton/NISTP256KeyPair.swift#L68](https://github.com/kryptco/krypton-ios/blob/82787da9d72a297c5ccc4bb73ff26d7a89e1f5e8/Krypton/NISTP256KeyPair.swift#L68)

