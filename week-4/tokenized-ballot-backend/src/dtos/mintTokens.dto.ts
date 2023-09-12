import * as swagger from '@nestjs/swagger';

export default class MintTokensDto {
  @swagger.ApiProperty({ type: String, default: 'My Address', required: true })
  address: string;

  @swagger.ApiProperty({ type: Number, default: 1, required: true })
  amount: number;
}
