[https://github.com/libp2p/specs/blob/master/relay/DCUtR.md](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md)
- Direct Connection Upgrade through Relay
- [[libp2p]]で実装している

- シグナリングサーバーレスでSyncする

- まずピア同士はリレーを介して接続する
- [[ホールパンチング]]ができたら、直接接続にアップグレードし、リレー接続を閉じる
