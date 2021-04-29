import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private user = new BehaviorSubject('');

  getUserId() {
    return this.user;
}
 
  assignUserId(message: any) {
    this.user.next(message);
}
}
