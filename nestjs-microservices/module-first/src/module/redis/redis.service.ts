import { isString } from 'lodash';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

/**
 * Service class for interacting with Redis cache.
 */
export class RedisCacheService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  /**
   * Retrieves the value associated with the given key from the cache.
   * @param key The key to retrieve the value for.
   * @param jsonParse Determines whether to parse the value as JSON or not. Defaults to true.
   * @returns The value associated with the key.
   */
  async get(key: string, jsonParse: boolean = true): Promise<any> {
    const data: string | unknown = await this.redisClient.get(key);

    if (jsonParse) {
      try {
        return JSON.parse(data as string);
      } catch (error) {
        return data;
      }
    }

    return data;
  }

  /**
   * Sets the value for the given key in the cache.
   * @param key The key to set the value for.
   * @param value The value to be set.
   * @param timeToLive The time to live for the key-value pair in seconds. Defaults to 1 hour (3600 seconds).
   * @returns A promise that resolves when the operation is completed.
   */
  async set(
    key: string,
    value: any,
    timeToLive: number | null | undefined = 60 * 60,
  ): Promise<any> {
    const valueSet = isString(value) ? value : JSON.stringify(value);

    if (timeToLive) {
      return await this.redisClient.set(key, valueSet, 'EX', timeToLive);
    }

    return await this.redisClient.set(key, valueSet);
  }

  /**
   * Deletes the value associated with the given key from the cache.
   * @param key The key to delete the value for.
   * @returns A promise that resolves when the operation is completed.
   */
  async del(key: string): Promise<any> {
    return await this.redisClient.del(key);
  }

  /**
   * Updates the value for the given key in the cache by preserving the time to live (TTL).
   * @param key The key to update the value for.
   * @param value The value to be updated.
   * @returns A promise that resolves when the operation is completed.
   */
  async update(key: string, value: any) {
    const valueSet = isString(value) ? value : JSON.stringify(value);
    const ttl = await this.redisClient.ttl(key);

    return await this.set(key, valueSet, ttl);
  }
}
