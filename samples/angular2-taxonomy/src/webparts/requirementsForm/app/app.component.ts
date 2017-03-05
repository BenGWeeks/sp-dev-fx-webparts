import { Component } from '@angular/core';
import { TaxonomyComponent } from './shared/taxonomy/taxonomy.component';

@Component({
   selector: 'app-root',
    //templateUrl: './app.component.html',
    //styleUrls: ['../../style.scss','./app.component.scss']
    //template: require('./app.component.html'), // You need html-loader for this.
    template: `
    <h1>{{title}}</h1>
    <taxonomy-component></taxonomy-component>
    `,
   //styleUrls: ['./app.component.scss']
    styles: [String(require('./app.component.scss'))]
})
export class AppComponent {
   title = 'Hello World!';
}
