export interface CreateUserDto {
  push_token?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  password: string;
  phone: string;
}
