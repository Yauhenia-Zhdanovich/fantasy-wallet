export enum SmartContractName {
  Weth = 'Weth',
  Dai = 'Dai',
}

export type SmartContractInfo = {
  name: SmartContractName;
  abi: any;
  address: string;
};
