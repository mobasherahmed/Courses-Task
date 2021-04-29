import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/services/courses.service';

@Component({
  selector: 'app-requested-courses',
  templateUrl: './requested-courses.component.html',
  styleUrls: ['./requested-courses.component.scss']
})
export class RequestedCoursesComponent implements OnInit {
  searchValue : string ;
  subscription: Subscription
  displayData: any[]; 
  StudentId : any;
  studentCourses: any [] = [];
  AllCourses: any;
  requrstCourseDetails: { PaymentType: any; RequestDate: any; };
  constructor(private _course:CoursesService,private route:ActivatedRoute) {
   }

  ngOnInit(): void {
      /*
      I don't prefer this way for sharing data in url for security ,
      I always sharing data in storge or session .. But i use this way here to implement more than 
      one way of sharing data  ..
      */
    this.route.paramMap.subscribe(params=>{
      // We should Conver it to number as params always return a string value ..  
      this.StudentId = Number(params.get('id'))
    })
    this.getStudentCourses()
    // get all courses from localStorage .. 
    this.AllCourses = JSON.parse(localStorage.getItem('Courses'));
  }
// get StudentCourses .. 
  getStudentCourses(){
    /*
    First get all students courses and filter them by custom student id that come from url 
    Then i will get paymenth method and date details ,
    Now i have an array of course_id that i should loop on them to get information of each one .. 
    */
   this.subscription = this._course.getStudentCourses().subscribe((requestedCourses:any)=>{
     let courses = requestedCourses.filter(course=>course.StudentId === this.StudentId);
     this.requrstCourseDetails = {
      PaymentType : courses[0].PaymentType,
      RequestDate : courses[0].RequestDate
     }
     let coursedIds = courses[0].Courses
     coursedIds.forEach(course => {
       let studentCourse = this.AllCourses.filter(all => course.CourseId === all.CourseId)
       this.studentCourses.push(studentCourse[0])
      });
      this.displayData = this.studentCourses
    })
  }

  // unsubscribe observables
  ngOnDestroy(){
    this.subscription.unsubscribe()
    } 
}
