import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback } from '../shared/feedback';
import { Story } from '../shared/story';

import { FeedbackService } from '../services/feedback.service';
import { StoryService } from '../services/story.service';

declare var $ :any;

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  public options: Object = {
  charCounterCount: true,
  toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough'],
  quickInsertTags: [''],
  htmlRemoveTags: [ 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'base', 'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas',
                    'caption', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
                    'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header',
                    'hgroup', 'hr', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'link', 'main', 'map', 'mark', 'menu',
                    'menuitem', 'meter', 'nav', 'noscript', 'object', 'optgroup', 'option', 'output', 'param', 'pre', 'progress', 'queue',
                    'rp', 'ruby', 'samp', 'script', 'style', 'section', 'select', 'small', 'source', 'span', 'sub', 'summary', 'sup',
                    'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'var', 'video', 'wbr'],
  linkEditButtons: [''],
  pastePlain: true,
  wordPasteModal: false,
  height:250

};


  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;

  @ViewChild('sform') storyFormDirective;
  storyForm: FormGroup;
  story: Story;
  action:string ="feedback";

  formErrors = {
    'name': '',
    'title': '',
    'message': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.'
    },
    'message': {
      'required': 'Message is required.'
    },
    'title': {
      'required': 'Title is required.'
    }
  };

  constructor(private fb: FormBuilder,
    private feedbackservice: FeedbackService,
    private storyservice: StoryService) { }

  ngOnInit() {
    this.createFeedbackForm();
    this.createStoryForm();
  }


//feedbackForm functions
  createFeedbackForm() {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required ],
      email: '',
      agree: false,
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onFeedbackValueChanged(data));

    this.onFeedbackValueChanged(); // (re)set form validation messages
  }

  onFeedbackValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onFeedbackSubmit() {
    console.log(this.feedbackForm.value);
    this.feedbackservice.postFeedback( this.feedbackForm.value)
      .catch(err => console.log("Error ", err));
    this.feedbackForm.reset({
      name: '',
      message: '',
      agree: false
    });
    this.feedbackFormDirective.resetForm();
  }

//storyForm functions
  createStoryForm() {
    this.storyForm = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required],
      title: ['', Validators.required]
    });

    this.storyForm.valueChanges
      .subscribe(data => this.onStoryValueChanged(data));

    this.onStoryValueChanged(); // (re)set form validation messages
  }

  onStoryValueChanged(data?: any) {
    if (!this.storyForm) { return; }
    const form = this.storyForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onStorySubmit() {
    console.log(this.storyForm.value);
    this.storyForm.value.featured = false;
    this.storyservice.postStory( this.storyForm.value)
      .catch(err => console.log("Error ", err));
    this.storyForm.reset({
      name: '',
      message: '',
      title: ''
    });
    this.storyFormDirective.resetForm();
  }

}
