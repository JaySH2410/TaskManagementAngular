import { TestBed } from '@angular/core/testing';

import { TaskSvc } from './task-svc';

describe('TaskSvc', () => {
  let service: TaskSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
