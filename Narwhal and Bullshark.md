---
aliases: []
---
- 従来の[[Consensus algorithm]]は、操作の伝播と合意がモノリシックになっていた
- Narwhal and Bullsharkでは、両者をNarwhalとBullsharkに分離
# [[Narwhal]]: DAG based Mempool
- Round: Block headerに対してCertificateが発行され、クオラム分をあつめる