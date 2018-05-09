import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
  htmlAllowedTags: [ 'a', 'b', 'i', 'p', 's', 'strike', 'strong'],
  height: 250,
};

  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;

  @ViewChild('sform') storyFormDirective;
  storyForm: FormGroup;
  story: Story;
  action:string ="comment";

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
