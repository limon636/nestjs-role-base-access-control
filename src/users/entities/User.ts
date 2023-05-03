import { Role } from 'src/auth/role/role.enum';

export class User {
  userId: number;
  username: string;
  password: string;
  role: Role[];
}
