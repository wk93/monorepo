export interface UserEntity {
  id: string;
  email: string;
  createdAt: Date;
}

export interface UserEntityWithPassword extends UserEntity {
  passwordHash: string;
}
