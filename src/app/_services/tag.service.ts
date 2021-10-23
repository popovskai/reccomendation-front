import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Tag } from '../_models/tag.model';


@Injectable({
  providedIn: 'root'
})
export class TagService {


  constructor(private httpClient: HttpClient) { }

}
