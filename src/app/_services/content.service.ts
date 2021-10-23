import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Content } from '../_models/content.model';
import { Tag } from '../_models/tag.model';
import { ContentTag } from '../_models/content-tag.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    'key': 'a'
  });

  userId: number = 1;
  contentTagModel: ContentTag;

  constructor(private httpClient: HttpClient) { }

  getMoviesImdb(searchedTitle: String): Observable<Object[]>{
    let url = "https://imdb8.p.rapidapi.com/title/auto-complete?q=" +searchedTitle;
    console.log(url);
    return this.httpClient.get<Object[]>(url, {headers: this.httpHeaders});
  }

  postContentwithTags(content: Content, contentTypeId: number, tags:Tag[]): Observable<Object>{
    const body = {
     "contentDTO": content,
     "tagDTOS":  tags
    }
    let url = "http://localhost:8080/api/contents/"+this.userId+"/"+contentTypeId;
        return this.httpClient.post(url, body);
  }

  getRatingFromImdb(id: String): Observable<Object>{
    let url = "https://imdb8.p.rapidapi.com/title/get-ratings?tconst=" +id;
    return this.httpClient.get<Object>(url, {headers: this.httpHeaders});
  }

  getAllContents():Observable<Content[]>{
    let url = "http://localhost:8080/api/contents";
    return this.httpClient.get<Content[]>(url);
  }

  getContentById(id: number):Observable<Content>{
    let url = "http://localhost:8080/api/contents/" + id;
    return this.httpClient.get<Content>(url);
  }

  getAllTagsForContent(id: number):Observable<Tag[]>{
    let url = "http://localhost:8080/api/contents/tags/" + id;
    return this.httpClient.get<Tag[]>(url);
  }
}
