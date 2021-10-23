import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private notificationService: NotificationService,
              public dialog: MatDialog) { }

  notifications: Notification[];

  ngOnInit(): void {
    this.getAllNotifications();
  }

  openDialog(){

    let dialogRef = this.dialog.open(NotificationComponent);
    dialogRef.componentInstance.notifications = this.notifications;

    dialogRef.afterClosed().subscribe(() => {
      this.getAllNotifications();
    });
  }

  getAllNotifications(){
    this.notificationService.getAllNotification().subscribe(
      data =>{ this.notifications = data;
        console.log(this.notifications.length);
      });
  }

}
