- [[OT]]とも

概要
![[assets/64fa6dc7ae04c7001ce62b17.png]]

- 文字列`abc`のページがある
- 以下2つのオペレーションが平行に行われる
	- `O1 = Insert[0, "x"]`
	- `O2 = Delete[2, "c"]`
- O1 -> O2:
	- まずO1を適用すると`xabc`
	- 1文字のInsertが一度されたので位置パラメータが1
	- 次にO2を適用する際に、O2をO1に対して変換し`O2' = Delete[2+位置パラメータ, "c"]`を得る
	- O2'を適用し`xab`
- O2 -> O1:
	- まずO2を適用すると`ab`
	- 次にO1を適用し`xab`


アプリケーション
もともと共同編集のために生まれた技術
- [[Apache Wave]]([[Google Wave]])
	- [https://www.usenix.org/conference/lisa-09/google-wave](https://www.usenix.org/conference/lisa-09/google-wave)
- [[Google Docs]]


参考文献
- 元論文? : [https://dl.acm.org/doi/10.1145/289444.289469](https://dl.acm.org/doi/10.1145/289444.289469)
- [https://srijancse.medium.com/operational-transformation-the-real-time-collaborative-editing-algorithm-bf8756683f66](https://srijancse.medium.com/operational-transformation-the-real-time-collaborative-editing-algorithm-bf8756683f66)
- [https://srijancse.medium.com/how-real-time-collaborative-editing-work-operational-transformation-ac4902d75682](https://srijancse.medium.com/how-real-time-collaborative-editing-work-operational-transformation-ac4902d75682)
- [https://dl.acm.org/doi/10.1145/2145204.2145411](https://dl.acm.org/doi/10.1145/2145204.2145411)
	- 2Dに拡張したらしい。未読。(kekeho)
- [https://hackernoon.com/analysing-different-operational-transformation-algorithms-for-collaborative-editing-60fcc49ef24b](https://hackernoon.com/analysing-different-operational-transformation-algorithms-for-collaborative-editing-60fcc49ef24b)
	- いろんなOTのアルゴリズムを紹介している。未読。(kekeho)
- [Google Drive Blog: What’s different about the new Google Docs: Working together, even apart](https://drive.googleblog.com/2010/09/whats-different-about-new-google-docs_21.html)
- [Google Drive Blog: What’s different about the new Google Docs: Conflict resolution](https://drive.googleblog.com/2010/09/whats-different-about-new-google-docs_22.html)
- [https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447](https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447)
