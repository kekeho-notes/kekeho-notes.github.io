[#NestJS](NestJS)

チュートリアルリンク
- [https://docs.nestjs.com/](https://docs.nestjs.com/)
	- Introduction, Overviewをやる

構成
- module.ts
	- controller, module, serviceを束ねる
	- `nest g module [module name]`で雛形を作り、app.module.tsに登録してくれる
- controller.ts
	- ルーティングなど
		- 特定のパスとControllerが紐付けられる
- controller.spec.ts
	- Controllerテスト
- service.ts
	- ビジネスロジックの定義
	- Controllerから呼び出される

Controller
```controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get(':id')
  @HttpCode(200) // 省略可能
  @Header('Cache-Control', 'none')  // 省略可能
  find(@Param('id') id: number, @Query('query') query): string {
    return 'Cat ' + id;
  }
}
```

- @Controllerデコレータで囲う. 引数はパス
- 各パスは@Get/@Postなどのデコレータで囲う。引数はパス。
```wildcard
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

- ちょっとした正規表現もサポートされている


Middleware
- [https://docs.nestjs.com/middleware](https://docs.nestjs.com/middleware)
	- アクセス時に自動で前処理をしたいときに使える
