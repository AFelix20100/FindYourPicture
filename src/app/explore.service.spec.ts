import { TestBed } from '@angular/core/testing';

import { ExploreServiceService } from './explore.service';

describe('ExploreServiceService', () => {
  let service: ExploreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
