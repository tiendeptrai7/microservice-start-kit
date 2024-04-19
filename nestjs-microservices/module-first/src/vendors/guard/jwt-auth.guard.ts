import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
  CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  createRedisAuthKey,
  getTokenFromBearer,
} from '../../common/ultils/untils';
import { Request } from 'express';
import { RedisCacheService } from '../../module/redis/redis.service';
import { AuthPayload, AuthPayloadRedis } from '../../module/auth/dto/auth.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  protected jwtService: JwtService;
  constructor(private readonly redisCacheService: RedisCacheService) {
    this.jwtService = new JwtService({
      secret: process.env.JWT_ACCESS_KEY,
      verifyOptions: {
        ignoreExpiration: false,
      },
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const accessToken = getTokenFromBearer(authorization);
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = this.verifyToken(accessToken);

    await this.verify({
      userId: payload?.userId,
      token: accessToken,
      userType: payload?.userType,
    });

    return true;
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      const errName = error?.name;
      if (errName == 'TokenExpiredError') {
        throw new UnauthorizedException();
      } else {
        throw new UnauthorizedException();
      }
    }
  }

  async verify(payload: AuthPayload) {
    const dataCache: AuthPayloadRedis = await this.redisCacheService.get(
      createRedisAuthKey(payload.userId, payload.userType),
    );
    if (!dataCache) {
      throw new UnauthorizedException();
    }

    if (dataCache?.accessToken !== payload?.token) {
      throw new UnauthorizedException();
    }

    return dataCache;
  }
}
