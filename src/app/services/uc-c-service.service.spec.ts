import { TestBed } from '@angular/core/testing';

import { UCCServiceService } from './uc-c-service.service';

describe('UCCServiceService', () => {
  let service: UCCServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UCCServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
