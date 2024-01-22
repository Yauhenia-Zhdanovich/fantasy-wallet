import { TestBed } from '@angular/core/testing';
import { EthereumClient } from './ethereum-client';

describe('EthereumClientService', () => {
  let service: EthereumClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthereumClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
