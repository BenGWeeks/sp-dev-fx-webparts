import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // Otherwise get "Can't bind to 'ngModel' since it isn't a known property of 'input'."
//import { AppSettings } from './app.settings';
import { HttpModule } from '@angular/http'; // Otherwise get: EXCEPTION: No provider for Http!
import { AppComponent } from './app.component';

import { JsonpModule } from '@angular/http';

// Import the Froala Editor plugin.
import "froala-editor/js/froala_editor.pkgd.min.js";
// Import Angular2 plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule, // Otherwise get "Can't bind to 'ngModel' since it isn't a known property of 'input'."
        HttpModule, // Otherwise get: EXCEPTION: No provider for Http!

        // Froala stuff
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),

        // To get JSON data we need this
        JsonpModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }