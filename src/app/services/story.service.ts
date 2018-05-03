
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';

@Injectable()
export class StoryService {

  constructor(private afs: AngularFirestore) { }

  postStory(story: any): Promise<any> {

    return this.afs.collection('stories')
      .add({
        name: story.name,
        message: story.message,
        featured: story.featured,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

}
