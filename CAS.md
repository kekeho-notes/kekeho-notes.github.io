- [[Compare And Set]]の略
- 特定のメモリが、指定した値と等しい場合に限り、別に指定した値に書き換える
```pseudo-code
function CAS(*target, expected, desired) -> bool {
	if (*target == expected) {
		*target = desired;
		return true;
	}
	return false;
}
```

- [[x86]]: [[cmpxchg]] (32bit), [[cmpxchg8b]] (64bit)
- [[Sparc]]: `CAS`
