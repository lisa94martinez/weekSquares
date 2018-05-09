
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environments';
import * as $ from 'jquery'; window["$"] = $; window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
