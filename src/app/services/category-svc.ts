import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { CreateUpdateCategoryDto } from '../models/category';
import { map } from 'rxjs/operators';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class CategorySvc {

  private http = inject(HttpClient);
  private readonly baseUrl = env.apiUrl + '/Category'; 

  getCategories(): Observable<Category[]> {
    return this.http.get<ApiResponse<Category[]>>(this.baseUrl).pipe(
      map(res => res.object)
    );
  }

  // POST create category
  createCategory(dto: CreateUpdateCategoryDto): Observable<Category> {
    return this.http.post<ApiResponse<Category>>(this.baseUrl, dto).pipe(
      map(res => res.object)
    );
  }
}
