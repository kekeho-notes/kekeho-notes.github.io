- [[Load-Linked Store-Conditional]]の略
- LLとSC、それぞれ[[アトミック操作]]できる
	- 個別のメモリにマーキングできるハードウェア的仕掛けがある
	- その領域に対して他スレッドが操作をすると、マーキングが揮発する
- [[RISC]]プロセッサ的な観点からみると、[[CAS]]は引数が多すぎる→LL/SCなら実装が単純

- ```pseudo-code,	function load_linked(*target) -> *void {
		marking(target, current_thread_id);
		return *target
	}
	
	function store_conditional(*target, *desired) -> bool {
		if (!is_marked(target, current_id)) {
			return false;
		}
		*target = desired;
		return true;
	}
	```

- 偽陰性がありうる
