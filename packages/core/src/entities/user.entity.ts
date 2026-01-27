export interface UserEntity {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface UserEntityWithPassword extends UserEntity {
  passwordHash: string;
}
