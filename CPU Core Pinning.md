- いくつかのOSでは、プロセスが使用するコアを固定することで、スケジューラによってコアを移動させられることを防げる
	- 評価取るときとかにOSのスケジューラの影響を排除できる

# Linux
- `taskset`コマンドを使うと、コアをそのプロセスに固定できる
	- そこに固定されるというだけで、そのコアで他のタスクも動いたりはする
	- `isolcpus`を使ってカーネルのスケジューリングからそのコアを外さないと、占有してはくれない
- カーネルのboot parameterの`nohz_full`, `isolcpus`をいい感じに設定すると、カーネルもそのコアを使わないようにできる
	- コアのトポロジーを意識して、物理コア単位で開放してあげるとよし
## 参考
- https://manuel.bernhardt.io/posts/2023-11-16-core-pinning/
- Kernel boot parameterの書き換え方: https://wiki.ubuntu.com/Kernel/KernelBootParameters

# macOS
- うーん、できなさそう?
- スレッドの[[QoS]]は設定できて、多分Eコアで動かしたり配慮はしてくれそう
- でも[[Rust]]の[core_affinity](https://github.com/Elzair/core_affinity_rs)ではどうもx86_64だとできそう? (試してない)

## 参考
```embed
title: "CPU Pinning on macOS – random blog"
image: ""
description: "Apple operating systems explicitly do not support CPU pinning in a shipping configuration."
url: "https://threedots.ovh/blog/2022/06/cpu-pinning-on-macos/"
```
