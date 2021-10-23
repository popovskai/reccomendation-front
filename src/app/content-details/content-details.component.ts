import { Component, Inject, OnInit } from '@angular/core';
import { Content } from '../_models/content.model';
import { Tag } from '../_models/tag.model';
import { ContentService } from '../_services/content.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class ContentDetailsComponent implements OnInit {

  id: number;
  contentId: number;
  content: Content;
  tags: Tag[];
  
  faStar = faStar;
  constructor(private contentService: ContentService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.contentId = +params['id'];
        this.getContentById(this.contentId);
        this.getAllTagsForContent(this.contentId);
      }
      );

    console.log(this.id);
   
      this.getContentById(this.id);

      this.getAllTagsForContent(this.id);

  }

  getContentById(id: number){
    this.contentService.getContentById(id).subscribe(
    data =>{ this.content = data;
      console.log(this.content);
    });
  }

  getAllTagsForContent(id: number){
    this.contentService.getAllTagsForContent(id).subscribe(
      data=>{ this.tags = data;
        console.log(this.tags);
      });

  }
}
