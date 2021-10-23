import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContentService} from './_services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  title = 'recom-app-frontend';


  constructor(private contentService: ContentService){
  }

}
