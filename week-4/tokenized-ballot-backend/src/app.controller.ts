import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import MintTokensDto from './dtos/mintTokens.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('get-address')
  getContractAddress(): any {
    return this.appService.getTokenAddress();
  }

  @Get('total-supply')
  getTotalSupply(): Promise<bigint> {
    return this.appService.getTotalSupply();
  }

  @Get('token-balance/:address')
  getTokenBalance(@Param('address') address: string): Promise<bigint> {
    return this.appService.getTokenBalance(address);
  }

  @Post('mint-tokens')
  mintTokens(@Body() body: MintTokensDto): Promise<any> {
    return this.appService.mintTokens(body.address, body.amount);
  }
}
