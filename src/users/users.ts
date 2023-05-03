import { Role } from '../auth/role/role.enum';

export const users = [
  {
    userId: 1,
    username: 'admin',
    password: 'admin',
    role: [Role.Admin],
  },
  {
    userId: 2,
    username: 'user',
    password: 'user',
    role: [Role.User],
  },
];
