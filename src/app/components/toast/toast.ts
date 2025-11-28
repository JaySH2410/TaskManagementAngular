import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastSvc } from '../../services/toast-svc';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.css']
})
export class Toast {
  toast = inject(ToastSvc);
}
