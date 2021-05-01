import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  courses: any[] = []
  requrstCourseDetails: { PaymentType: any; RequestDate: any; };
  selectedCoursesIds: any[] = [];

  getRequestedCourses() {
    return this.courses;
  }

  assignRequestedCourse(message: any) {
    this.courses.push(message);
  }
}
