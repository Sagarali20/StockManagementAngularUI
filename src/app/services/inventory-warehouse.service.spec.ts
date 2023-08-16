import { TestBed } from '@angular/core/testing';

import { InventoryWarehouseService } from './inventory-warehouse.service';

describe('InventoryWarehouseService', () => {
  let service: InventoryWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
