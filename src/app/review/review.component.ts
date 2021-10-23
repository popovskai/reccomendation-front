import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Review } from '../_models/review.model';
import { ReviewService } from '../_services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  id: number; 
  reviews: Review[];
  review: Review;
 
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.review = new Review();
    this.getAllReviewsForContent();
  }
  
  onFormSubmitOther(f: NgForm){

    this.reviewService.postReview(this.review, this.id).subscribe(
      data => {
        console.log(data);
        this.getAllReviewsForContent();
      }
    );
    f.reset();
  }

  getAllReviewsForContent(){
    this.reviewService.getAllReviewsForContent(this.id).subscribe(
      data =>{
        this.reviews = data;
      });
  }

}
