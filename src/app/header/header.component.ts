import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  StudentId = 1234
  activeText: string= 'home'
  constructor(private router:Router) {
   }

  ngOnInit(): void {
  }

  navigateTo(route){
    if(route === 'all-courses'){
      this.router.navigate([`all-courses`])
      this.activeText='home'
    }else if (route === 'requested'){
      this.router.navigate([`requested-courses`])
      this.activeText='requested'
    }else{
      this.router.navigate([`profile`])
      this.activeText='profile'
    }
  }

}
