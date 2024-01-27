import { TestBed } from '@angular/core/testing';

import { EthereumBalanceService } from './ethereum-balance.service';

describe('EthereumBalanceService', () => {
  let service: EthereumBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthereumBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
