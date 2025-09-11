import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import crypto from 'crypto';

@Injectable()
export class AppCacheService {
  constructor(@Inject('CACHE_MANAGER') private cache: Cache) {}

  // Hash params to create a unique cache key
  hashParams(params: unknown) {
    return crypto
      .createHash('sha1')
      .update(JSON.stringify(params))
      .digest('hex');
  }

  async get<T>(key: string) {
    try {
      const result = await this.cache.get<T>(key);
      return result ?? null;
    } catch (error) {
      console.error(`❌ Cache get error for key ${key}:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlMs?: number) {
    try {
      await this.cache.set(key, value, ttlMs);
    } catch (error) {
      console.error(`❌ Cache set error for key ${key}:`, error);
      throw error;
    }
  }

  async del(key: string) {
    try {
      await this.cache.del(key);
    } catch (error) {
      console.error(`❌ Cache del error for key ${key}:`, error);
      throw error;
    }
  }

  // Pattern: wrap: check cache -> if miss call factory -> set cache -> return data
  async wrap<T>(
    key: string,
    ttlSecs: number,
    factory: () => Promise<T>,
  ): Promise<T> {
    const hit = await this.get<T>(key);
    if (hit !== null) {
      console.log(`⚡ Cache hit for key ${key}`);
      return hit;
    }
    const data = await factory();
    await this.set(key, data, ttlSecs);
    return data;
  }

  /**
   * Invalidate using "version key" (no need to SCAN delete individual keys)
   * - Store a version for namespace (e.g. category:123)
   * - Actual key includes version -> bump version is considered logical deletion
   */
  async bumpVersion(nsKey: string) {
    // Use ioredis raw client if want INCR; here write simple: store timestamp
    await this.set(nsKey, Date.now(), 60 * 60 * 24 * 7); // keep 7 days
  }

  async getVersion(nsKey: string): Promise<string> {
    const version = (await this.get<string>(nsKey)) ?? '0';
    return version;
  }
}