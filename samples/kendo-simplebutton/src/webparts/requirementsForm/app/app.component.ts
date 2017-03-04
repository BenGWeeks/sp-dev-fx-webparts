import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
    //templateUrl: './app.component.html',
    //styleUrls: ['../../style.scss','./app.component.scss']
    //template: require('./app.component.html'), // You need html-loader for this.
    template: `
    <h1>{{title}}</h1>
    <button kendoButton (click)="onButtonClick()" [primary]="true">
    My Kendo UI Button
    </button>
    `,
   //styleUrls: ['./app.component.scss']
    styles: [String(require('./app.component.scss'))]
})
export class AppComponent {
   title = 'Hello World!';

   onButtonClick() {
       this.title = 'Hello from Kendo UI!';
   }
}
