import { TestBed } from '@angular/core/testing';

import { LineOrdersService } from './line-orders.service';

describe('LineOrdersService', () => {
  let service: LineOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
