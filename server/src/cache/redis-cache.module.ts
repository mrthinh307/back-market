import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppCacheService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL');
        
        // Validate Redis URL format
        if (!redisUrl || !/^redis(s)?:\/\//i.test(redisUrl)) {
          console.error('❌ Invalid REDIS_URL format. Must start with redis://');
          console.log('💡 Example: redis://username:password@host:port');
          console.log('💡 Local: redis://localhost:6379');
          throw new Error('Invalid REDIS_URL configuration');
        }

        try {
          const store = await redisStore({
            url: redisUrl,
            // Convert seconds to milliseconds since cache-manager uses milliseconds
            ttl: config.get<number>('CACHE_TTL_SEC', 600) * 1000, 
          });

          console.log('✅ Redis Cache Store connected successfully');
          
          return { store };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('❌ Failed to connect to Redis:', errorMessage);
          throw error;
        }
      },
    }),
  ],
  providers: [AppCacheService],
  exports: [AppCacheService],
})
export class RedisCacheModule {}
  