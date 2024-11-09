- [[PoW]]を初めて提案したとされるシステム
- E-mailの[[スパム対策]], [[DoS攻撃]]対策
- [[Adam Back]]により提案された

ヘッダ
- `X-Hashcash`ヘッダを導入
- 例:
	- ```hashcash-mailheader,		X-Hashcash: 1:20:1303030600:anni@cypherspace.org::McMybZIhxKXu57jd:ckvi
		```
- ver: Hashcash format version, 1 (which supersedes version 0).
- bits: Number of "partial pre-image" (zero) bits in the hashed code.
- date: The time that the message was sent, in the format YYMMDD[hhmm[[ss]]].
- resource: Resource data string being transmitted, e.g., an IP address or email address.
- ext: Extension (optional; ignored in version 1).
- rand: String of random characters, encoded in base-64 format.
- counter: Binary counter, encoded in base-64 format.