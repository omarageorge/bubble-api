export class FindTransactionDto {
  id: string;
  sender: string;
  receiver: string;
  source_currency: string;
  target_currency: string;
  exchange_rate: number;
  amount: number;
}
