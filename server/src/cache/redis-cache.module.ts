import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppCacheService } from './cache.service';
import { CacheKeyFactory } from './cache-key.factory';

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
          console.error(
            '❌ Invalid REDIS_URL format. Must start with redis://',
          );
          console.log('💡 Example: redis://username:password@host:port');
          console.log('💡 Local: redis://localhost:6379');
          console.log('💡 Secure: rediss://username:password@host:port');
          throw new Error('Invalid REDIS_URL configuration');
        }

        // Determine if TLS should be used based on URL and configuration
        const useTls =
          redisUrl.startsWith('rediss://') ||
          config.get<boolean>('REDIS_TLS', false);

        try {
          const baseConfig = {
            url: redisUrl,
            // Convert seconds to milliseconds since cache-manager uses milliseconds
            ttl: config.get<number>('CACHE_TTL_SEC', 600) * 1000,
          };

          // Create store configuration with conditional TLS
          const store = useTls
            ? await redisStore({
                ...baseConfig,
                socket: {
                  tls: true,
                  // Add option to reject unauthorized certificates (useful for self-signed certs)
                  rejectUnauthorized: config.get<boolean>(
                    'REDIS_TLS_REJECT_UNAUTHORIZED',
                    true,
                  ),
                },
              })
            : await redisStore(baseConfig);

          if (useTls) {
            console.log('🔒 Redis connecting with TLS enabled');
          } else {
            console.log('🔓 Redis connecting without TLS');
          }

          console.log('✅ Redis Cache Store connected successfully');

          return { store };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
          console.error('❌ Failed to connect to Redis:', errorMessage);
          throw error;
        }
      },
    }),
  ],
  providers: [AppCacheService, CacheKeyFactory],
  exports: [AppCacheService, CacheKeyFactory],
})
export class RedisCacheModule {}
