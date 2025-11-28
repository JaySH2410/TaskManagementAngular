import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorySvc } from '../../services/category-svc';
import { ToastSvc } from '../../services/toast-svc';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories-form.html',
  styleUrl: './categories-form.css',
})
export class CategoriesForm {
  private router = inject(Router);
  private Category = inject(CategorySvc);
  
  constructor(private toast: ToastSvc) {}

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  onSave() {
    if (this.categoryForm.invalid) return;

    const value: any = {
      ...this.categoryForm.value
    };
    this.Category.createCategory(value).subscribe(category => {
      console.log("Category created:", category);
    });
    this.toast.show('Category added successfully!', 'success');
    this.categoryForm.reset();
    this.router.navigate(['/tasks']);
  }
  onCancel() {
    this.categoryForm.reset();
    this.router.navigate(['/tasks']);
  }
}
