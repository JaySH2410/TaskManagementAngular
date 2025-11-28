import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksManagement } from './tasks-management';

describe('TasksManagement', () => {
  let component: TasksManagement;
  let fixture: ComponentFixture<TasksManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
