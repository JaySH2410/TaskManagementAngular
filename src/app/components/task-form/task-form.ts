import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Task } from '../../models/task';
import { UIButton } from '../../shared/components/ui-button/ui-button';
import { UICard } from '../../shared/components/ui-card/ui-card';
import { UIHeader } from '../../shared/components/ui-header/ui-header';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html'
})
export class TaskFormComponent {

  taskForm!: FormGroup;

  categories = [
    { id: 1, name: 'Work' },
    { id: 2, name: 'Personal' },
    { id: 3, name: 'Learning' }
  ];

  statuses = ['Pending', 'InProgress', 'Completed'];

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSave() {
    if (this.taskForm.valid) {
      console.log('Form submitted:', this.taskForm.value);
      // Call API here
    }
  }

  onCancel() {
    this.taskForm.reset();
  }

  // @Input() task: Task | null = null;         // <-- REQUIRED
  // @Output() close = new EventEmitter<void>(); // <-- REQUIRED

  // private fb = inject(FormBuilder);

  // isEdit = false;

  // form = this.fb.group({
  //   title: ['', Validators.required],
  //   description: ['', Validators.required],
  //   status: ['Pending', Validators.required],
  //   categoryId: [1, Validators.required],
  // });

  // ngOnInit() {
  //   if (this.task) {
  //     this.isEdit = true;
  //     this.form.patchValue(this.task);
  //   }
  // }

  // save() {
  //   this.close.emit();
  // }

  // cancel() {
  //   this.close.emit();
  // }
}


// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { TaskSvc } from '../../services/task-svc';
// import { TaskStore } from '../../services/task-store';
// import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
// import { Task } from '../../models/task';

// @Component({
//   selector: 'app-task-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './task-form.html',
// })
// export class TaskFormComponent implements OnInit {

//   @Input() task: Task | null = null;
//   @Output() close = new EventEmitter<void>();


//   private fb = inject(FormBuilder);
//   private route = inject(ActivatedRoute);
//   private router = inject(Router);
//   private service = inject(TaskSvc);
//   private store = inject(TaskStore);

//   form = this.fb.group({
//     title: ['', Validators.required],
//     description: ['', Validators.required],
//     status: ['Pending', Validators.required],
//     categoryId: [1, Validators.required]
//   });

//   isEdit = false;
//   id!: number;

//   ngOnInit(): void {
//     const paramId = this.route.snapshot.paramMap.get('id');
//     if (paramId) {
//       this.isEdit = true;
//       this.id = Number(paramId);
//       this.service.getTask(this.id).subscribe(task => this.form.patchValue(task));
//     }

//     if (this.task) {
//       this.form.patchValue(this.task);
//     }
//   }

//   save() {
//     if (this.form.invalid) return;
//     const dto = this.form.value;

//     if (this.isEdit) {
//       this.service.updateTask(this.id, dto as any).subscribe(task => {
//         this.store.updateTask(task);
//         this.router.navigate(['/tasks']);
//       });
//     } else {
//       this.service.createTask(dto as any).subscribe(task => {
//         this.store.addTask(task);
//         this.router.navigate(['/tasks']);
//       });
//     }
//     this.close.emit();
//   }

//   cancel() {
//     this.router.navigate(['/tasks']);
//     this.close.emit();
//   }
// }
