import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback } from '../shared/feedback';
import { Story } from '../shared/story';

import { FeedbackService } from '../services/feedback.service';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  @ViewChild('cform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  submitted = null;
  showForm = true;

  @ViewChild('sform') storyFormDirective;
  storyForm: FormGroup;
  story: Story;
  action:string ="comment";

  formErrors = {
    'name': '',
    'email': '',
    'message': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.'
    },
    'message': {
      'required': 'message is required.'
    },
    'email': {
      'email': 'Email not in valid format'
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
      email: ['',  Validators.email ],
      agree: false,
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onFeedbackValueChanged(data));

    this.onFeedbackValueChanged(); // (re)set form validation messages
  }

  createStoryForm() {
    this.storyForm = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required ],
      featured: false,
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
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.showForm = false;
    this.feedbackservice.submitFeedback(this.feedback)
      .subscribe(feedback => {
         this.submitted = feedback;
         this.feedback = null;
         setTimeout(() => { this.submitted = null; this.showForm = true; }, 5000);
        },
        error => console.log(error.status, error.message));
    this.feedbackForm.reset({
      name: '',
      email: '',
      agree: false,
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  onStorySubmit() {
    this.story = this.storyForm.value;
    console.log(this.story);
    this.showForm = false;
    this.storyservice.submitStory(this.story)
      .subscribe(story => {
         this.submitted = story;
         this.story = null;
         setTimeout(() => { this.submitted = null; this.showForm = true; }, 5000);
        },
        error => console.log(error.status, error.message));
    this.storyForm.reset({
      name: '',
      email: '',
      agree: false,
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
