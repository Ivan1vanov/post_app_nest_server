import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { configService } from './config/config';
import { Entities } from './entity';
import { ImageModule } from './modules/image/image.module';
import { PostModule } from './modules/post/post.module';
import { UserInfoModule } from './modules/user-info';
import { UserTokenModule } from './modules/user-token/user-token.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: Entities,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PostModule,
    ImageModule,
    CloudinaryModule,
    AuthModule,
    UserInfoModule,
    UserTokenModule,
  ],

  controllers: [AppController],
  providers: [AppService, CloudinaryService, JwtService],
})
export class AppModule {}
