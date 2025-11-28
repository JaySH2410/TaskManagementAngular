import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './components/toast/toast';
import { Sidebar } from './components/sidebar/sidebar';
// import { AuthSvc } from './services/auth-svc';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor() {}
  protected readonly title = signal('TaskManagement');
}
