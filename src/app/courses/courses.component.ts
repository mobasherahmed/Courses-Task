import { Component, OnInit } from "@angular/core";
import { forkJoin, Subscription } from "rxjs";
import { CoursesService } from "src/services/courses.service";
import { map } from 'rxjs/operators'

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  checked: boolean = true;
  searchValue;
  courses:any [] = []
  filters: any [] = [];
  subscription: Subscription
  displayData: any[];
  today:any = new Date
  constructor(private _course:CoursesService) {}

  ngOnInit(): void {
    this.getRequiredData()
  }
  
  getRequiredData(){
    // using forkjoin operator from rxjs to get data of two observables .. 
    let data = forkJoin([
      this._course.getCourses(),
      this._course.getFilterationCategories()
    ]).pipe(
      map(
        ([
          courses,
          filters,
        ]) => {
          return {
            courses,
            filters,      
          }
        },
      ),
    )
    // get all observables results in one subscription to easily unsubscribe them ..
    this.subscription = data.subscribe(data => {
      console.log(data)
      this.courses = data.courses
      this.displayData = this.courses
      this.filters = data.filters
    })
  }
  onSearchChange() {
    if (this.searchValue !== '') {
      console.log(this.searchValue)
      this.displayData = this.courses.filter(
        course =>
          String(course.CourseName)
            .toUpperCase()
            .includes(String(this.searchValue).toUpperCase()) 
      )
      console.log(this.courses)
    } else {
      this.displayData = this.courses // Refresh
    }
  }
  ngOnDestroy(){
  this.subscription.unsubscribe()
  }  
}
