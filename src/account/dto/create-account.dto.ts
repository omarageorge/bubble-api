export class CreateAccountDto {
  type: string;
  balance: number;
  holder: string;
}

export class CreateAccountResDto {
  id: string;
  type: string;
  balance: number;
}
