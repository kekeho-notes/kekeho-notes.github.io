- いくつかのOSでは、プロセスが使用するコアを固定することで、スケジューラによってコアを移動させられることを防げる
	- 評価取るときとかにOSのスケジューラの影響を排除できる

# Linux
- `taskset`コマンド
## 参考
```embed
title: "On pinning and isolating CPU cores"
image: "https://manuel.bernhardt.io/wp-content/cpu-costs.jpg"
description: "This year I have been involved in running performance benchmarks of Aeron over at Adaptive on two major cloud providers. I learned quite a few things about the arcane arts science craft of running performance benchmarks. When benchmarking a piece of software, you really want to get the best performance out of it, which is to say that you also want to run it under the best conditions in order to see what is possible."
url: "https://manuel.bernhardt.io/posts/2023-11-16-core-pinning/"
```

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
