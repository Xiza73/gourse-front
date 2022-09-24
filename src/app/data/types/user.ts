import { Admin } from "./admin";
import { Client } from "./client";
import { Role } from "./role";

export interface User {
  _id     ?: string;
  username?: string;
  password?: string;
  role    ?: Role;
  onPerson?: 'Client' | 'Admin';
  status  ?: number;
  person  ?: Client | Admin;
}