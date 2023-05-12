import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env.development.local',
    }),

    UserModule,
  ],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
