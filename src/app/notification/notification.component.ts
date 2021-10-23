import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[];
  contentId: number;
  
  constructor(private notificationService: NotificationService,
              private router: Router) { }
  

  ngOnInit(): void {
  }

  onClickNotification(id: number){
    this.notificationService.updateSeenNotification(id).subscribe(
      
      data =>{ this.contentId = data["contentId"];
      this.router.navigate(['details', this.contentId])
      
    });
  }

}
