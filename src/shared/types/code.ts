export enum AuthCodeType {
  REGISTER_USER = 'register_user',
  RESET_PASSWORD_USER = 'reset_password_user',
}

export interface AuthCodeRequest {
  email: string;
  type: AuthCodeType;
}

export interface AuthCodeResponse {
  id: number;
  userId: number;
  type: AuthCodeType;
  createdAt: string;
  updatedAt: string;
  isActiveAt: string;
  availableAttempts: number;
}

export interface AuthCodeConfirmRequest {
  email: string;
  type: AuthCodeType;
  code: string;
  payload?: {
    password?: string;
  };
}

export interface AuthCodeConfirmResponse {
  isConfirmed: boolean;
  availableAttempts: number;
}
