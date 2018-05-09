import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Story } from '../shared/story';

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
        title: story.title,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  getFeaturedStory(): Observable<Story[]> {
  return this.afs.collection('stories', ref => ref.where('featured', '==', true)).snapshotChanges()
  .map(actions => {
    return actions.map(action => {
      const data = action.payload.doc.data() as Story;
      const _id = action.payload.doc.id;
      return { _id, ...data };
    });
  });
}

}
