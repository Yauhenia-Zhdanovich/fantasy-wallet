import Web3 from 'web3';

export abstract class SmartContractService {
  constructor(web3: Web3) {}

  public abstract getBalanceOf(address: string): any;

  public abstract transfer(toAddress: string, amount: number): any;
}
