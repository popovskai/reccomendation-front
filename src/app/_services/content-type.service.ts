import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import{HttpClient} from'@angular/common/http';
import { ContentType } from '../_models/content-type.model';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

  constructor(private httpClient: HttpClient) { }

  getContentTypes():Observable<ContentType[]>{
    let url = "http://localhost:8080/api/types/";
    return this.httpClient.get<ContentType[]>(url);
  }
  
}
