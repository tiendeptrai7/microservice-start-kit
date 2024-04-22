import { UserType } from 'src/module/auth/dto/auth.dto';

export function createRedisAuthKey(userId: number, userType: UserType) {
  return `Authen_User_${userType}_${userId}`;
}

export function getTokenFromBearer(authorizationString: string) {
  if (!!authorizationString && authorizationString.split(' ')[0] === 'Bearer') {
    return authorizationString.split(' ')[1];
  }
  return null;
}