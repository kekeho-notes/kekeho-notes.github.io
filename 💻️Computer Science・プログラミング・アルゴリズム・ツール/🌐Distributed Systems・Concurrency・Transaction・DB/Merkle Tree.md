![[assets/643a3b52a1c9a2001c8982a7.png]]

- [[Bitcoin]], [[Git]], [[IPFS]]で使われる
- [[Balanced Tree]]
- 別に二分木である必要はない
	- それはそう(kekeho)
- 全てのノードはサブMerkle Treeのルート
- $log_2(n)$で，与えられたデータがMerkle Treeに含まれるか検証できる($n$はLeafの数)
	- 最低限の各節のハッシュ値も知っている必要がある
- 自己検証ができる
- 同じ葉を持つTreeの根は、同じハッシュ値になる
- データの重複排除に使える

- [[Merkle TreeをTiling]]することでストレージを削減みたいな話もある
	- [[Sunlight]]で使われている
	- [https://research.swtch.com/tlog#tiling_a_log](https://research.swtch.com/tlog#tiling_a_log)

活用例
- [[Content Addressing]]に使われる
	- [[IPFS]]
- 同期の最適化(同じ葉を持つTreeの根が同じハッシュ値になる性質を活かす)
	- [[Dynamo]]: レプリカ間の状態の効率的な比較
	- [[ZFS]]
- ブロックチェーン
	- [[Bitcoin]]

解説記事
- [https://medium.com/coinmonks/merkle-trees-concepts-and-use-cases-5da873702318](https://medium.com/coinmonks/merkle-trees-concepts-and-use-cases-5da873702318)

実装例

```rust
use ring::digest::{Digest, SHA256, Context};
use std::rc::Rc;

struct Node {
    hash: Digest,
    left: Option<Rc<Node>>,
    right: Option<Rc<Node>>,
}


fn digest(data: &[u8]) -> Digest {
    let mut context = Context::new(&SHA256);
    context.update(data);
    let digest = context.finish();
    return digest;
}


fn add(left: &Digest, right: &Digest) -> Digest {
    let or: Vec<u8> = left.as_ref().iter().zip(right.as_ref().iter()).map(|(&l, &r)| l | r).collect();
    return digest(&or[..]);
}


impl Node {
    pub fn include(self: &Rc<Node>, data: &[u8], digests: &[&Digest]) -> bool {
        let mut prev_hash = digest(data);
        for digest in digests {
            prev_hash = add(&prev_hash, digest);
        }

        if self.hash.as_ref() == prev_hash.as_ref() {
            return true
        }

        return false;
    }


    pub fn merge(left: Rc<Node>, right: Rc<Node>) -> Rc<Node> {
        let parent: Rc<Node> = Rc::new(Node {
            hash: add(&left.hash, &right.hash),
            left: Some(left),
            right: Some(right),
        });

        return parent;
    }

    fn build_nodetree(nodes: &[Rc<Node>]) -> Rc<Node> {
        if nodes.len() == 1 {
            return nodes[0].clone();
        }

        let mut parent_list: Vec<Rc<Node>> = Vec::new();

        for i in (0..nodes.len()).step_by(2) {
            if nodes.len() == i+1 {
                // 奇数この場合、最後の要素を複製する
                let parent = Node::merge(nodes[nodes.len()-1].clone(), nodes[nodes.len()-1].clone());
                parent_list.push(parent);
                break;
            }
            let parent = Node::merge(nodes[i].clone(), nodes[i+1].clone());
            parent_list.push(parent);
        }

        

        return Node::build_nodetree(&parent_list)
    }

    pub fn build_tree(data: &[&[u8]]) -> Rc<Node> {
        let mut leaf_list: Vec<Rc<Node>> = Vec::new();
        for v in data {
            let d = digest(v);
            leaf_list.push(
                Rc::new(Node {
                    hash: d,
                    left: None,
                    right: None,
                })
            );
        }        

        return Node::build_nodetree(&leaf_list[..])
    }
}



fn main() {
    let datalist = [
        "hoge",
        "fuga",
        "piyo",
    ].map(|d| d.as_bytes());

    // Build Merkle Tree
    let root = Node::build_tree(&datalist[..]);

    // Check piyo!
    let data = "piyo";
    let given_digests = [
        &root.right.clone().unwrap().left.clone().unwrap().hash,
        &root.left.clone().unwrap().hash
    ];
    if root.include(data.as_bytes(), &given_digests) {
        println!("{} include!", data);
    } else {
        println!("error");
    }

    // Check fuga!
    let data = "fuga";
    let given_digests = [
        &root.left.clone().unwrap().left.clone().unwrap().hash,
        &root.right.clone().unwrap().hash
    ];
    if root.include(data.as_bytes(), &given_digests) {
        println!("{} include!", data);
    } else {
        println!("error");
    }

    // Wrong digests
    let data = "fuga";
    let given_digests = [
        &root.left.clone().unwrap().left.clone().unwrap().hash,
        &root.left.clone().unwrap().hash
    ];
    if root.include(data.as_bytes(), &given_digests) {
        println!("error");
    } else {
        println!("wrong digests");
    }

    // Check not include
    let data = "unko";
    let given_digests = [
        &root.left.clone().unwrap().right.clone().unwrap().hash,
        &root.right.clone().unwrap().hash
    ];
    if root.include(data.as_bytes(), &given_digests) {
        println!("error")
    } else {
        println!("{} is not included", data);
    }

}

```
