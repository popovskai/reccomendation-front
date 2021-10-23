import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Review } from '../_models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  userId: number = 1;
  constructor(private httpClient: HttpClient) { }

  getAllReviewsForContent(id: number):Observable<Review[]>{
    let url = "http://localhost:8080/api/reviews/"+id;
    return this.httpClient.get<Review[]>(url);
  }

  postReview(review: Review, id: number):Observable<Review>{
    let url = "http://localhost:8080/api/reviews/" + id +"/" + this.userId;
    return this.httpClient.post<Review>(url,review);
  }
}
