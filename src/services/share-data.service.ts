import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  courses :any [] = []

  getRequestedCourses(){
    return this.courses;
}
 
  assignRequestedCourse(message: any) {
    this.courses.push(message);
}
}
