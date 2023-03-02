import { v4 as uuid } from 'uuid';

export interface User {
  id: ReturnType<typeof uuid>;
  email?: string;
}
