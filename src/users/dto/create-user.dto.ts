export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class CreateUserResultDto {
  id: string;
  name: string;
  email: string;
}
