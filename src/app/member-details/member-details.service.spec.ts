import { TestBed } from '@angular/core/testing';

import { MemberDetailsService } from './member-details.service';

describe('MemberDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberDetailsService = TestBed.get(MemberDetailsService);
    expect(service).toBeTruthy();
  });
});
