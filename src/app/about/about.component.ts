import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Story } from '../shared/story';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  stories: Story[];
  storyErrMess: string;
  safeMessage: SafeHtml;

  constructor(private storyservice: StoryService,
              private domsanitizer: DomSanitizer) { }

  ngOnInit() {
    this.storyservice.getFeaturedStory()
     .subscribe(story => {
       this.stories = story
       console.log(this.stories)
       this.stories.forEach(story => {
         story.safeMessage = this.domsanitizer.bypassSecurityTrustHtml(story.message) //HTML escape
        })
        errmess => this.storyErrMess = <any>errmess
     })
  }

}
