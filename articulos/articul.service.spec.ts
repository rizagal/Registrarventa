import { TestBed } from '@angular/core/testing';

import { ArticulService } from './articul.service';

describe('ArticulService', () => {
  let service: ArticulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
