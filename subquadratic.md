- 線形($O(n)$)より大きく、二次($O(n^2)$)より小さい実行時間で動作するアルゴリズムを指す
- $O(n^{2/log \ n})$とか, $O(n^{1.5})$など

# 数学的な定義
- subquadratic関数は、以下の不等式を満たす関数$\varphi$である。
  $\varphi(x + y)  + \varphi(x - y) \le 2\varphi(x) + 2\varphi(y)$
	- 不等号が逆$\ge$になる場合は、[[superquadratic]]と呼ばれる

# 関連
- [[計算量]]