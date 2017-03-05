import { Component } from '@angular/core';

@Component({
 selector: 'layout-header',
 template: `<div>{{name}}</div>`
})
export class HeaderComponent {
 constructor() {}
 
 name: string = 'Requirement';
}