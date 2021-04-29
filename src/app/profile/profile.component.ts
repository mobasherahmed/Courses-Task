import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/services/courses.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  StudentId: number;
  data: any 

  constructor(private route:ActivatedRoute,private _course:CoursesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      // We should Conver it to number as params always return a string value ..  
      this.StudentId = Number(params.get('id'))
    })
    this.getStudentInfo()
  }

  getStudentInfo(){
 this._course.getStudentInfo().subscribe((res:any)=>{
   let allstudent = res;
   this.data = allstudent.filter(student => student.Id  === this.StudentId)
 })
}



}
