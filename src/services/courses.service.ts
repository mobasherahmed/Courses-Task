import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
// Reading Local JSON Files Using Angular HttpClient
  constructor(private http:HttpClient) { }

  getCourses():Observable<any>{
    return this.http.get('assets/courses.json')
  }
 
  getCourse(CourseId):Observable<any>{
    return this.http.get(`assets/courses.json/${CourseId}`)
  }
  
  // I made this file json to store filteration categories ..
  getFilterationCategories():Observable<any>{
    return this.http.get('assets/filter.json')
  }
  
  getStudentCourses():Observable<any>{
    return this.http.get(`assets/requests.json`);
  }
  getStudentInfo():Observable<any>{
    return this.http.get(`assets/students.json`);
  }

}

