import { Injectable } from '@angular/core';
import { Story } from '../shared/story';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/catch';

@Injectable()
export class StoryService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitStory(Story: Story): Observable<Story> {
    return this.http.post(baseURL + 'story', Story)
    .catch(error => { return this.processHTTPMsgService.handleError(error); });

  }
}
