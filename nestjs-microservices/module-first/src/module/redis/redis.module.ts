import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis.service';
import { RedisModule } from '@nestjs-modules/ioredis';
require('dotenv').config();

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: 'redis://' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT,
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
