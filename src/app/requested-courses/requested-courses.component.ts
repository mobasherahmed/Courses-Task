import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/services/courses.service';
import { ShareDataService } from 'src/services/share-data.service';

@Component({
  selector: 'app-requested-courses',
  templateUrl: './requested-courses.component.html',
  styleUrls: ['./requested-courses.component.scss']
})
export class RequestedCoursesComponent implements OnInit {

  displayData: any[];
  requestedCourses: any[] = [];
  today: Date = new Date
  requrstCourseDetails: { PaymentType: any; RequestDate: any; } = { PaymentType: 'Online', RequestDate: this.today };
  TotalPrice: number;
  constructor(private share: ShareDataService) {
    this.requestedCourses = this.share.getRequestedCourses()
    this.requrstCourseDetails = this.share.requrstCourseDetails ? this.share.requrstCourseDetails : this.requrstCourseDetails
  }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('studentCourses'))
    this.displayData = this.requestedCourses.concat(data)
    this.getTotalPrice(this.displayData)
  }

  getTotalPrice(data) {
    let price = 0
    data.forEach(el => {
      price += el.CoursePrice;
      this.TotalPrice = price
    });

  }
}
