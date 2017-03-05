import { Component } from '@angular/core';
import { Inject } from '@angular/core';
//import { TaxonomyService } from './taxonomy.service';
import { DataHelpersFactory } from './datahelper.factory';
import { Taxonomy } from './taxonomy.model';
import { TermStore } from './termstore.model';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
//import styles from './taxonomy.module.scss';

@Component({
  selector: 'taxonomy-component',
  providers : [DataHelpersFactory],
  template: `
  <div class="wt-termSetRequester">
    <div class="wt-taxonomyContainer">
      <div class="wt-taxonomy">
        <ul class="wt-termStoreList">
          <li *ngFor="let termStore of termStores">
            <div class="wt-info">
                <b title="{{termStore.description}}">{{termStore.name}}</b>
                <button class="ms-GroupHeader-expand wt-groupHeaderExpand">
                    <i class="ms-Icon ms-Icon--ChevronDown" [ngClass]="{'is-collapsed': !termStore.isExpanded}" (click)="termStore.actionClick()"></i>
                </button>
            </div>
            <ul [hidden]="!termStore.isExpanded" class="wt-termGroupList">
              <li *ngFor="let termGroup of termStore.termGroups">
                <div class="wt-info">
                  <b title="{{termGroup.description}}">{{termGroup.name|slice:0:30}}{{termGroup.name.length>30?'...':''}}</b>
                  <button class="ms-GroupHeader-expand wt-groupHeaderExpand">
                    <i class="ms-Icon ms-Icon--ChevronDown" [ngClass]="{'is-collapsed': !termGroup.isExpanded}" (click)="termGroup.actionClick()"></i>
                  </button>
                </div>
                <ul [hidden]="!termGroup.isExpanded" class="wt-termSetList">
                  <li *ngFor="let termSet of termGroup.termSets">
                    <div class="wt-info">
                      <b title="{{termSet.description}}">{{termSet.name|slice:0:30}}{{termSet.name.length>30?'...':''}}</b>
                      <button class="ms-GroupHeader-expand wt-groupHeaderExpand">
                        <i class="ms-Icon ms-Icon--ChevronDown" [ngClass]="{'is-collapsed': !termSet.isExpanded}" (click)="termSet.actionClick()"></i>
                      </button>
                    </div>
                    <ul [hidden]="!termSet.isExpanded" class="wt-termList">
                      <li *ngFor="let term1 of termSet.terms">
                        <div class="wt-info">
                          <b (click)="highlight($event,term1.id)" title="{{term1.description}}">{{term1.name|slice:0:30}}{{term1.name.length>30?'...':''}}</b>
                          <button class="ms-GroupHeader-expand wt-groupHeaderExpand">
                            <i class="ms-Icon ms-Icon--ChevronDown" (click)="term1.actionClick()" [ngClass]="{'is-collapsed': !term1.hasChildTerms}"></i>
                          </button>
                        </div>
                        <ul [hidden]="!term1.hasChildTerms" class="wt-termList">
                          <li *ngFor="let term2 of term1.terms">
                            <div class="wt-info">
                              <b (click)="highlight($event,term2.id)" title="{{term2.description}}">{{term2.name|slice:0:30}}{{term2.name.length>30?'...':''}}</b>
                              <button class="ms-GroupHeader-expand wt-groupHeaderExpand">
                                <i class="ms-Icon ms-Icon--ChevronDown" [hidden]="!term2.hasChildTerms" (click)="term2.actionClick()" [ngClass]="{'is-collapsed': !term2.hasChildTerms}"></i>
                              </button>
                            </div>
                            <ul [hidden]="!term2.hasChildTerms" class="wt-termList">
                              <li *ngFor="let term3 of term2.terms">
                                <div class="wt-info">
                                  <b (click)="highlight($event,term3.id)" title="{{term3.description}}">{{term3.name|slice:0:30}}{{term3.name.length>30?'...':''}}</b>
                                  <button class="ms-GroupHeader-expand wt-groupHeaderExpand">
                                    <i class="ms-Icon ms-Icon--ChevronDown" [hidden]="!term3.hasChildTerms" (click)="term3.actionClick()" [ngClass]="{'is-collapsed': !term3.hasChildTerms}"></i>
                                  </button>
                                </div>


                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `,
  styles: [
        String(require('./taxonomy.scss'))//,
        //String(require('../../../taxonomypicker.scss'))
    ] // You need sass-loader for this. Also do not call it "something.module.scss" (see https://bob1german.com/2016/12/12/html-templates-in-spfx/), and also read more here: https://github.com/jtangelder/sass-loader

})
export class TaxonomyComponent {
  private context: IWebPartContext;
  private componentName: string = 'Angular2';
  private model: Taxonomy;
  protected termStores: Array<TermStore>;

  // Ref: https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-child-local-var
  public selectedTermGuid = new Subject<string>(); // The Guid of the item selected.
  public selectedTermGuidStream = this.selectedTermGuid.asObservable(); // Observable string streams. We want to be able to subscribe to this.

  //Assign 
  //  constructor (@Inject(TaxonomyService) private _friendService: TaxonomyService) {
    //constructor(_friendService: FriendService) {
  //  this.termStores = _friendService.getFriends();
  //}

  /**
   * ctor
   * @param context: web part context
   */
  //constructor(context: IWebPartContext) {
  //constructor(@Inject(IWebPartContext) private context: IWebPartContext) {
  constructor() {
    this.model = new Taxonomy(this.context);
    //this.termStores = ko.observableArray<TermStoreViewModel>();
    //this.termStores = new Observable<TermStoreViewModel[]>();
    this.termStores = new Array<TermStore>();
  }

  public ngOnInit(): Promise<void> {
    return new Promise<void>((resolve) => {
        // loading top level items of the hierarchy
        this.model.getTermStores().then((termStores) => {
            const termStoreViewModels: TermStore[] = [];
            termStores.forEach((value) => {
                termStoreViewModels.push(new TermStore(this.model, value));
            });
            window.console && console.log("termStore.length = " + termStoreViewModels.length);
            //this.termStores(termStoreViewModels);
            this.termStores = termStoreViewModels;
            resolve();
        });
    });
  }

  // Returns the selected term GUID. This can be subscribed to.
  public getSelectedTerm() : Observable<string> {
    // Observable.of<string>();
    return this.selectedTermGuid;
  }

  public highlight(event:any, selectedItemGuid:string) {
    event.preventDefault();
    window.console && console.log('highlight(): selectedItemGuid = ' + selectedItemGuid);
    this.selectedTermGuid.next(selectedItemGuid);
  }
}

