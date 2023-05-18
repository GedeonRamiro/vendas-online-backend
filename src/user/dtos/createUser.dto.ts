export interface CreateUserDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  typeUser: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
