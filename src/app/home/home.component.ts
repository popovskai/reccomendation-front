import { Component, OnInit } from '@angular/core';
import { Content } from '../_models/content.model';
import { ContentService } from '../_services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ContentDetailsComponent } from '../content-details/content-details.component';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ReviewComponent } from '../review/review.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contents: Content[];
  faStar = faStar;
  constructor(private contentService: ContentService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllContents();
  }

  getAllContents(){
    this.contentService.getAllContents().subscribe(
      data =>{ this.contents = data;
      });
  }

  onAddNewContent(){
    console.log("klik")
    this.router.navigate(['add']);
  }

  onDetails(id: number){
    console.log(id);
    this.router.navigate(['details', id]);
  }

  openDialog(id: number){
    
    let dialogRef = this.dialog.open(ContentDetailsComponent);
    dialogRef.componentInstance.id = id;
  }

  openComments(id: number){

    let dialogRef = this.dialog.open(ReviewComponent);
    dialogRef.componentInstance.id = id;
  
    dialogRef.afterClosed().subscribe(() => {
      this.getAllContents();
    });
  }
}
