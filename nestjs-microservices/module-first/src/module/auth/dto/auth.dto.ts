export enum UserType {
  ADMIN = 'admin',
  APP_END_USER = 'app_end_user'
}

export interface AuthPayloadRedis {
  userId: number;
  userType: UserType
  email: string | null;
  deviceId: string | null;
  permissions: [];
  accessToken: string;
  refreshToken?: string;
  expired?: number | null;
  tokenType?: string | null;
  userStatus?: boolean
}

export interface AuthPayload {
  userId: number;
  userType: UserType
  token: string;
}