import { TestBed } from '@angular/core/testing';

import { AuthSvc } from './auth-svc';

describe('AuthSvc', () => {
  let service: AuthSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
