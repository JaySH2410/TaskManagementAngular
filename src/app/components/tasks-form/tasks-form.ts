import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStore } from '../../services/task-store';
import { TaskStatus } from '../../models/task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskSvc } from '../../services/task-svc';
import { ToastSvc } from '../../services/toast-svc';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks-form.html',
  styleUrl: './tasks-form.css',
})
export class TasksForm implements OnInit {

  isEdit: boolean = false;
  id!: string | null;

  taskStore = inject(TaskStore);
  taskSvc = inject(TaskSvc);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  categories = this.taskStore.categories;
  statuses: TaskStatus[] = ['Pending', 'InProgress', 'Done'];

  constructor(private toast: ToastSvc) {
    this.taskStore.loadCategories();
  }

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    categoryId: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.isEdit = true;
      const task = this.taskStore.tasks().find(t => t.id === Number(this.id));

      if (task) {
        this.taskForm.patchValue({
          ...task,
          categoryId: task.categoryId.toString()
        });
      }
    }
  }


  getCategoryName(categoryId: number | string | null) {
    const list = this.categories();  // signal call to retrieve value

    const category = list.find(c => c.id === Number(categoryId));
    return category ? category.name : '';
  }


  onSave() {
    if (this.taskForm.invalid) return;

    const value: any = {
      ...this.taskForm.value
      // categoryId: Number(this.taskForm.value.categoryId),
      // createdAt: new Date().toISOString(),  // add required field
      // categoryName: this.getCategoryName(this.taskForm.value.categoryId!) // derive name
    };

    if (this.isEdit) {
      console.log("Editing task:", value);
      if (this.id) {
        this.taskStore.updateTask(this.id, value);
        // this.toast.show('Task updated successfully!', 'success');
      }
    } else {
      this.taskStore.addTask(value);
      // this.toast.show('Task added successfully!', 'success');
    }

    this.taskForm.reset();
    this.taskStore.loadTasks();
    this.router.navigate(['/tasks']);
  }

  onCancel() {
    this.taskForm.reset();
    this.router.navigate(['/tasks']);
  }
}


// import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-tasks-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './tasks-form.html',
//   styleUrl: './tasks-form.css',
// })
// export class TasksForm {

//   isEdit: boolean = false;

//   taskForm = new FormGroup({
//     title: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     description: new FormControl('', Validators.required),
//     categoryId: new FormControl('', Validators.required),
//     status: new FormControl('', Validators.required)
//   });

//   onSave() {
//     if (this.taskForm.invalid) return;

//     console.log("Form submitted:", this.taskForm.value);
//   }

//   onCancel() {
//     this.taskForm.reset();
//   }
// }
