// src/app/services/task.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, CreateUpdateTask } from '../models/task';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { catchError, map } from 'rxjs/operators';
import {env} from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class TaskSvc {
  private http = inject(HttpClient);
  private readonly baseUrl = env.apiUrl + '/Task';

  getTasks(): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(this.baseUrl).pipe(
      map(res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          return res.object;
        } else {
          throw new Error(res.message + ' | ' + res.detail);
        }
      }),
      catchError(err => {
        console.error(err.error.Message);
        return throwError(() => err.error.Message);
      })
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<ApiResponse<Task>>(`${this.baseUrl}/${id}`).pipe(
      map(res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          return res.object;
        } else {
          throw new Error(res.message + ' | ' + res.detail);
        }
      }),
      catchError(err => {
        return throwError(() => err.error?.message || 'Error fetching task by id');
      })
    );
  }

  createTask(dto: CreateUpdateTask): Observable<Task> {
    return this.http.post<ApiResponse<Task>>(this.baseUrl, dto).pipe(
      map(res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          return res.object;
        } else {
          throw new Error(res.message + ' | ' + res.detail);
        }
      }),
      catchError(err => {
        return throwError(() => err.error?.message || 'Error creating task');
      })
    );
  }

  updateTask(id: string, dto: CreateUpdateTask): Observable<Task> {
    return this.http.put<ApiResponse<Task>>(`${this.baseUrl}/${id}`, dto).pipe(
      map(res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          return res.object;
        } else {
          throw new Error(res.message + ' | ' + res.detail);
        }
      }),
      catchError(err => {
        return throwError(() => err.error?.message || 'Error updating task');
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`).pipe(
      map(res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          return;
        } else {
          throw new Error(res.message + ' | ' + res.detail);
        }
      }),
      catchError(err => {
        return throwError(() => err.error?.message || 'Error deleting task');
      })
    );
  }

}
