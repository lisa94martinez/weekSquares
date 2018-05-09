import { Component, OnInit, Pipe, PipeTransform, SecurityContext  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Story } from '../shared/story';
import { StoryService } from '../services/story.service';




@Pipe({ name: 'keepHtml', pure: false })
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  story: Story[];
  storyErrMess: string;
  safeMessage: SafeHtml;

  constructor(private storyservice: StoryService,
              private domsanitizer: DomSanitizer) { }

  ngOnInit() {
    this.storyservice.getFeaturedStory()
     .subscribe(story => {
       this.story = story
//       this.story.safeMessage = this.domsanitizer.sanitize(SecurityContext.HTML, this.story.message)
//       this.story.safeMessage = this.domsanitizer.bypassSecurityTrustHtml(this.story.message)
        console.log(this.story)

        this.story.forEach(st => {
          st.safeMessage = this.domsanitizer.bypassSecurityTrustHtml(st.message)
        })


       errmess => this.storyErrMess = <any>errmess
     })

  }



}
