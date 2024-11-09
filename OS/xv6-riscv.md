
- [[xv6]]の[[RISC-V]]向け実装
- [https://github.com/mit-pdos/xv6-riscv](https://github.com/mit-pdos/xv6-riscv)

インストール方法

必要なツールをインストール
Mac
macの場合、インストールが完了するまでに数時間かかる可能性がある。
```shell
brew tap riscv-software-src/riscv
brew install qemu riscv-tools
```

Ubuntu（WSLを含む）
Ubuntuの場合は恐らくすぐにインストールできる。
```shell
sudo apt-get install \
	git \
	build-essential \
	gdb-multiarch \
 	qemu-system-misc \
 	gcc-riscv64-linux-gnu \
 	binutils-riscv64-linux-gnu
```

ビルド
```shell
git clone https://github.com/mit-pdos/xv6-riscv.git
cd xv6-riscv
make -j
make -j qemu  # 起動
```

- 起動後、Ctrl-A Xで抜けられる


Trap and system calls
- [[Trap]]: [[ecall]]によるシステムコール呼び出し、[[exception]], デバイス割り込みによる[[Interrupt]]の総称

参考資料
- xv6-book: [xv6: a simple, Unix-like teaching operating system](https://pdos.csail.mit.edu/6.828/2023/xv6/book-riscv-rev3.pdf)
- メモリ: [https://daikimiura.hatenablog.com/entry/2020/12/14/120800](https://daikimiura.hatenablog.com/entry/2020/12/14/120800)
