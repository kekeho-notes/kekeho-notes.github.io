[#分散システム](分散システム.md)
- 正確には、ネットワークが分断されているとき([[Network partition]])に、[[Consistency]]([[Linearizability]])と[[Availability]]がトレードオフになるという定理。
	- 例えば[[Consistency]]を[[Eventual Consistency]]などに弱めたら、話は違ってくる。
注意
- 「分散システムでは、[[Consistency]], [[Availability]], [[Partition-tolerance]]のうち2つまでを提供ができるという定理」と言われたりするが、そういうことじゃないね
	- なんかもう変な広まり方しているので、CAP定理という言葉を使わないほうがいい
- 拡張した[[PACELC theorem]]というのが提唱されている

参考
- [https://www.ibm.com/jp-ja/topics/cap-theorem](https://www.ibm.com/jp-ja/topics/cap-theorem)
- [[ amutake CAP]]
- [https://ipsj.ixsq.nii.ac.jp/ej/?action=repository_uri&item_id=96124&file_id=1&file_no=1](https://ipsj.ixsq.nii.ac.jp/ej/?action=repository_uri&item_id=96124&file_id=1&file_no=1)
