import { NestFactory} from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TokenBlacklistService } from './token-blacklist/token-blacklist.service';



async function bootstrap() {
  TokenBlacklistService.initBlackList();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
