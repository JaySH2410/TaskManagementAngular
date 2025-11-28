export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  userName: string;
}
