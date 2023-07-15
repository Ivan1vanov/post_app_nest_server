import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './config';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get('NODE_PORT');
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(port).then(() => {
    logger.log('Conected to database successfully');
    logger.log(`Server started on http://localhost:${port}`);
  });
}
bootstrap();
