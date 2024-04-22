import { Injectable, Logger } from '@nestjs/common';
import { RegisterInputDto } from '../user/dto/register.dto';
import { UserService } from '../user/user.service';
import { Users } from '../../entities/users.entity';
import { AuthData, AuthPayloadRedis, UserType } from './dto/auth.dto';
import { createRedisAuthKey } from '../../common/ultils/untils';
import { RedisCacheService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private cedisCacheService: RedisCacheService,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}
  async register(registerInputDto: RegisterInputDto): Promise<any> {
    try {
      const userInfo = await this.userService.createUser(registerInputDto);
      return await this.createAuth(userInfo)
    } catch (error) {
      this.logger.error(error);
    }
  }

  createAuthToken(
    payload: any,
    accessTokenExpired: number | undefined = +process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
    refreshTokenExpired: number | undefined = +process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
  ) {
    const { accessToken, expired } = this.generateAccessToken(
      payload,
      accessTokenExpired,
    );
    const { refreshToken } = this.generateRefreshToken(
      payload,
      refreshTokenExpired,
    );

    return { accessToken, refreshToken, expired, tokenType: 'Bearer' };
  }

  generateRefreshToken(payload: any, expiresIn: number | undefined) {
    const expired: string | null = expiresIn
      ? new Date(Date.now() + expiresIn * 1000).toISOString()
      : null;

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn,
    });
    return { refreshToken, expired };
  }

  generateAccessToken(
    payload: any,
    expiresIn: number | undefined = +process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
  ) {
    const expired: string | null = expiresIn
      ? new Date(Date.now() + expiresIn * 1000).toISOString()
      : null;

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: +expiresIn,
    });
    return { accessToken, expired };
  }

  async createAuth(input: Users): Promise<AuthData> {
    try {
      const payloadToken = {
        userId: input.id,
        userType: UserType.APP_END_USER,
      };

      const auth = this.createAuthToken(payloadToken);

      const authPayloadRedis: AuthPayloadRedis = {
        userId: input.id,
        userType: UserType.APP_END_USER,
        email: input.email ?? null,
        permissions: [],
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        userStatus: input.status,
        deviceId: '',
      };

      await this.setAuthRedisData(authPayloadRedis);

      return auth;

    } catch (error) {
      this.logger.error(error);
    }
  }

  async setAuthRedisData(payload: AuthPayloadRedis) {
    const key = createRedisAuthKey(payload.userId, payload.userType);
    const expired = process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME
      ? +process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME * 1000
      : null;
    return await this.cedisCacheService.set(key, payload, expired);
  }
}
