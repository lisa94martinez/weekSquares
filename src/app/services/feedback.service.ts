
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';

@Injectable()
export class FeedbackService {

  constructor(private afs: AngularFirestore) { }

  postFeedback(feedback: any): Promise<any> {
    return this.afs.collection('feedback')
      .add({
        name: feedback.name,
        message: feedback.message,
        email: feedback.email,
        agree: feedback.agree,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

}
