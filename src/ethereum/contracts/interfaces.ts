export enum SmartContractName {
  Weth = 'Weth',
  Dai = 'Dai',
}

export type SmartContractInfo = {
  name: SmartContractName;
  abi: any;
  address: string;
  tokenName: string;
  symbol: string;
};

export type BalanceInfo = {
  balance: string;
  tokenName: string;
  symbol: string;
};
