import { Component, OnInit } from "@angular/core";
import { forkJoin, Subscription } from "rxjs";
import { CoursesService } from "src/services/courses.service";
import { map } from 'rxjs/operators'
import { ShareDataService } from "src/services/share-data.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  checked: boolean = false;
  todoListCheck: boolean = true;
  searchValue : string ;
  courses:any [] = []
  filters: any [] = [];
  subscription: Subscription
  displayData: any[];
  today:any = new Date
  filterArr: any [] = [];
  StudentId:number = 1234;
  CourseName:string
  showAlert: boolean;
  CourseId: any[] = [];
  cartText :string= 'Add to cart'
  studentCourses: any [] = [];
  constructor(private _course:CoursesService,private share:ShareDataService) {
  }

  ngOnInit(): void {
    this.getRequiredData()
  }
  
  getRequiredData(){
    // using forkjoin operator from rxjs to get data from multi observables .. 
    let data = forkJoin([
      this._course.getCourses(),
      this._course.getFilterationCategories(),
      this._course.getStudentCourses(),
      this._course.getStudentInfo()
    ]).pipe(map(([courses,filters,studentsCourses,studentsInfo]) => {
          return {courses,filters,studentsCourses,studentsInfo}}))
    // get all observables results in one subscription to easily unsubscribe them ..
    this.subscription = data.subscribe(data => {
      this.courses = data.courses
      this.displayData = this.courses
      this.filters = data.filters
      // save to locaStorage ..
      localStorage.setItem('Courses', JSON.stringify(data.courses));
      this.getStudentCourses(data.studentsCourses)
      this.getStudentInfo(data.studentsInfo)
    })
  }

  
  //add course
  addCourse(course){
    // edit avaliable seat .. 
    this.editCourseSeats(course.CourseId,course.AvailableSeats - 1)
    this.share.assignRequestedCourse(course)
    this.CourseName = course.CourseName
    this.CourseId.push(course.CourseId) 
    this.share.selectedCoursesIds = this.CourseId;
    this.cartText = 'In your cart'
    this.showAlert = true
    setTimeout(() => {
      this.showAlert = false
    }, 2000);
  }


  editCourseSeats(courseId , AvaliableSeats){
    let allCourses = JSON.parse(localStorage.getItem('Courses'));
    allCourses.forEach(el => {
      if(el.CourseId === courseId){
        el.AvailableSeats = AvaliableSeats
      }
    });
    localStorage.setItem('Courses', JSON.stringify(allCourses));
    this.displayData = allCourses
  }

  getStudentCourses(studentCourses){
    let courses = studentCourses.filter(course=>course.StudentId === this.StudentId);
    this.share.requrstCourseDetails = {
      PaymentType : courses[0].PaymentType,
      RequestDate : courses[0].RequestDate
    }
    let coursedIds = courses[0].Courses;
    let AllCourses = JSON.parse(localStorage.getItem('Courses'));
    coursedIds.forEach(course => {
      let studentCourse = AllCourses.filter(all => course.CourseId === all.CourseId)
      this.studentCourses.push(studentCourse[0])
      if(this.share.selectedCoursesIds.length === 0){
        this.CourseId.push(studentCourse[0].CourseId)
      }else{
        this.CourseId = this.share.selectedCoursesIds
      }
      this.cartText = 'In your cart'
     });
     localStorage.setItem('studentCourses',JSON.stringify(this.studentCourses))
  }

  getStudentInfo(studentsInfo){
   let studentInfo =  studentsInfo.filter(student => student.Id  === this.StudentId)
   localStorage.setItem('studentInfo',JSON.stringify(studentInfo))
  }

  // search function 
  onSearchChange() {
    if (this.searchValue !== '') {
      this.displayData = this.courses.filter(
        course =>
        // check if search value exist in any course it will return target course/courses .. 
          String(course.CourseName)
            .toUpperCase()
            .includes(String(this.searchValue).toUpperCase()) 
      )
    } else {
      this.displayData = this.courses // Refresh
    }
  }

  // filteration function .. 
  getFilterValue(checked,value,category){
    if(checked){
      switch(category){
        case 'Course Duration':{
         this.filterCoursedBasedOnDuration(value)
         break;
        }
        case 'All Categories':{
         this.filterCoursedBasedOnCategory(value)
         break;
        }
        case 'The difficulty level of the course':{
         this.filterCoursedBasedOnDifficult(value)
         break;
        }
        default:{
          break;
        }
      }
      
    }else{
      this.displayData = this.courses // refresh
    }
  }

  // filter based on duration category ..
  filterCoursedBasedOnDuration(value){
    switch(value){
      case 'Less than 2 hours':{
        this.displayData = this.courses.filter(course=>{
          if(course.CourseDuration < 2 ){
            return course 
          } 
        })
        break;
      }
      case 'From 2 to 10 hours':{
        this.displayData = this.courses.filter(course=>{
          if( course.CourseDuration >= 2 && course.CourseDuration <= 10 ){
            return course 
          } 
        }) 
        break;
      }
      case 'more than 10 hours':{
        this.displayData = this.courses.filter(course=>{
          if( course.CourseDuration > 10 ){
            return course 
          } 
        }) 
        break;
      }
      default:{
        break;
      }
    }
  }

  // filter based on category ..
  filterCoursedBasedOnCategory(value){
    switch(value){
      case 'Development':{
        this.displayData = this.courses.filter(course=>{
          if(course.CourseCategory === value ){
            return course 
          } 
        })
        break;
      }
      case 'Finance & Accounting':{
        this.displayData = this.courses.filter(course=>{
          if( course.CourseCategory === value ){
            return course 
          } 
        }) 
        break;
      }
      case 'IT & Software':{
        this.displayData = this.courses.filter(course=>{
          if( course.CourseCategory === value ){
            return course 
          } 
        }) 
        break;
      }
      /*
      Note:
      This Case if he checked this means he want other coures that don't match 
      ==> ['IT & Software','Finance & Accounting','Development'] <== those categories ,
      so i have to get courses with different category ..
      */
      case 'Others':{
        this.displayData = this.courses.filter(course=>{
          // Great shorthand of || OR Operator ..
          if(!['IT & Software','Finance & Accounting','Development'].includes(course.CourseCategory)  ){
            return course 
          } 
        }) 
        break;
      }
      default:{
        break;
      }
    }
  }

  // filter based on difficulity ..
  filterCoursedBasedOnDifficult(value){
    switch(value){
      case 'Beginner':{
        this.displayData = this.courses.filter(course=>{
          if(course.courseLevel === value ){
            return course 
          } 
        })
        break;
      }
      case 'Intermediate':{
        this.displayData = this.courses.filter(course=>{
          if( course.courseLevel === value ){
            return course 
          } 
        }) 
        break;
      }
      case 'Expert':{
        this.displayData = this.courses.filter(course=>{
          if( course.courseLevel === value ){
            return course 
          } 
        }) 
        break;
      }
      // Get all data ..
      case 'All Levels':{
        this.displayData = this.courses
        break;
      }
      default:{
        break;
      }
    }
  }

  // unsubscribe observables
  ngOnDestroy(){
  this.subscription.unsubscribe()
  }  
}
