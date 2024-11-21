- [[two-phase commit]]
- 2PC自体は故障が起きないことを仮定している
	- 2PC自体はstatelessなので、2PCで書き込む先のストレージ自体が[[Crash-recovery model]]で動いていればOK ([参考](https://kumagi.hatenablog.com/entry/distributed_system_taxonomy_part3))
# 参考
- [Consensus Protocols: Two-Phase Commit](https://www.the-paper-trail.org/post/2008-11-27-consensus-protocols-two-phase-commit/)
	- いろいろな[[fault]]が起きたときにどうなるかも含めて解説していていい記事