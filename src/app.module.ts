import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123123@Dat',
      database: 'test_nestjs_db',
      entities: [User],
      synchronize: true,
    }),
    UsersModule
  ],
})
export class AppModule {}
