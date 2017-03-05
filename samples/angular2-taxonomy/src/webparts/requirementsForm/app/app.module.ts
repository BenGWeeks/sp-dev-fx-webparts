import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // Otherwise get "Can't bind to 'ngModel' since it isn't a known property of 'input'."
//import { AppSettings } from './app.settings';
import { HttpModule } from '@angular/http'; // Otherwise get: EXCEPTION: No provider for Http!
import { AppComponent } from './app.component';
import { JsonpModule } from '@angular/http';

/** Nested Components */ 
import { HeaderComponent } from './shared/header/header.component';
import { TaxonomyComponent } from './shared/taxonomy/taxonomy.component';
//import { TaxonomyService } from './shared/friends/taxonomy.service';
import { DataHelpersFactory } from './shared/taxonomy/datahelper.factory';

@NgModule({
   declarations: [
        AppComponent,
        TaxonomyComponent
   ],
   imports: [
       BrowserModule,
       FormsModule,
       HttpModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
