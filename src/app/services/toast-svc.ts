import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastSvc {

  message = signal<string | null>(null);
  type = signal<'success' | 'error' | 'info'>('success');
  visible = signal(false);

  show(msg: string, type: 'success' | 'error' | 'info' = 'success') {
    this.message.set(msg);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(() => this.hide(), 3000);
  }

  hide() {
    this.visible.set(false);
  }
}
