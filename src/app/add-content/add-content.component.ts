import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContentService} from '../_services/content.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContentType } from '../_models/content-type.model';
import { ContentTypeService } from '../_services/content-type.service';
import { Content } from '../_models/content.model';
import { Tag } from '../_models/tag.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  selectedId: number = 0;
  selected: String = '';
  searchedTitle: String;
  moviesImdb: Object[];
  contentTypes: ContentType[];
  content: Content;
  tags: Tag[] = [
    //{id: null, name: 'Test'}
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(private contentService: ContentService,
              private contentTypeService: ContentTypeService,
              private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit(): void {
    this.content = new Content();
    this.getContentTypes();
  }

  onOptionsSelected(event) {
    
    console.log(event);
    console.log(this.selectedId);
    if(this.selectedId == 1){
      this.selected = "movie";
    }else if(this.selectedId == 2){
      this.selected = "tvseries";
    }else if(this.selectedId == 3){
      this.selected = "podcast";
    }else if(this.selectedId == 4){
      this.selected = "webinar";
    }else if(this.selectedId == 5){
      this.selected = "book";
    }else{
      this.selected = "other";
    }

 }

  onFormSubmitOther(form: NgForm){
    console.log(this.content);
    if(this.selectedId == 3 || this.selectedId == 4 || this.selectedId == 6){
      this.contentService.postContentwithTags(this.content, this.selectedId, this.tags).subscribe(data =>{
        console.log(data);
        this.router.navigate(['home']);
      },
    error => console.log('oops', error)
    );
    }else if(this.selectedId == 1 || this.selectedId == 2){
      this.searchedTitle = this.content.title.replace(/\s/g, '%20');
      this.contentService.getMoviesImdb(this.searchedTitle).subscribe(
        data => { this.moviesImdb = data["d"];
          console.log(this.moviesImdb)
        });
    }
  }

  onClick(id: String, title: String, url:String){
    this.contentService.getRatingFromImdb(id).subscribe(
      data => { this.content.externalRating = data["rating"];
        console.log(data);
        console.log(data["rating"]);
        this.content.title = title;
        this.content.externalId = id;
        this.content.imgSource = url;
        this.contentService.postContentwithTags(this.content, this.selectedId, this.tags).subscribe(data =>{
          console.log(data);
          this.router.navigate(['home']);
        });
      });
  }

  getContentTypes(){
    this.contentTypeService.getContentTypes().subscribe(
      data =>{ this.contentTypes = data;
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if(!this.tags.some(tag => tag.name === value.trim())){
        this.tags.push({id: null, name: value.trim()});
        console.log(this.tags);
      }
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
