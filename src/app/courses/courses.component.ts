import { Component, OnInit } from "@angular/core";
declare var require: any
const data: any = require('./courses.json')
const filters: any = require('./filter.json')
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
  constructor() {}

  ngOnInit(): void {
    this.courses = data
    this.filters = filters
  }
  onSearchChange() {}
}
