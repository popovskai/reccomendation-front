import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  userId: number = 1;
  constructor(private httpClient: HttpClient) { }
  
  getAllNotification():Observable<Notification[]>{
    let url = "http://localhost:8080/api/notifications/"+this.userId;
    return this.httpClient.get<Notification[]>(url);
  }

  updateSeenNotification(id:number):Observable<Notification>{
    let url = "http://localhost:8080/api/notifications/"+this.userId +"/" + id;
    return this.httpClient.patch<Notification>(url, null);
  }
  
}
