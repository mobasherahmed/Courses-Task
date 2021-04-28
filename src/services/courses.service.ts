import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
// Reading Local JSON Files Using Angular HttpClient
  constructor(private http:HttpClient) { }

  getCourses():Observable<any>{
    return this.http.get('assets/courses.json')
  }
  
  getFilterationCategories():Observable<any>{
    return this.http.get('assets/filter.json')
  }
}

