import { Component, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

import { Requirement } from './requirement.model';

import { SPComponentLoader } from '@microsoft/sp-loader';

import pnp from "sp-pnp-js";

@Component({
    selector: 'app-root',
    //templateUrl: './app.component.html',
    //styleUrls: ['../../style.scss','./app.component.scss']
    //template: require('./app.component.html'), // You need html-loader for this.
    template: `
    <div class="container gt-container-fluid gt-container-form">
    <div class="row">
        <div class="col-sm-6">
            <fieldset class="gt-fieldset">
                <!-- <legend class="gt-legend">Details</legend> -->
                <div class="row gt-row">
                    <!-- <div class="col-6"><label for="title">Requirements Title:</label></div>-->
                    <div class="col-6"><div>Requirements Title</div></div>
                    <div class="col-6"><input id="title" type="text" class="k-textbox" [(ngModel)]="Requirement.Title" /></div>
                </div>
                <div class="row gt-row">
                    <!-- <div class="col-12"><label for="details">Requirements Details:</label></div>-->
                    <div class="col-12"><div>Requirements Details:</div></div>
                </div>
                <div class="row gt-row">
                    <div class="col-12" class="wt-froala">
                        <textarea [froalaEditor]='froalaOptions' name="details" id="details" class="k-textbox gt-textbox" [readonly]="(pageMode=='Display')" [(ngModel)]="Requirement.Details"></textarea>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</div>
    `,
    providers: [],
    styles: [
        String(require('../../../styles.scss'))//,
        //String(require('../../../taxonomypicker.scss'))
    ] // You need sass-loader for this. Also do not call it "something.module.scss" (see https://bob1german.com/2016/12/12/html-templates-in-spfx/), and also read more here: https://github.com/jtangelder/sass-loader
})

export class AppComponent {
    public pageTitle = 'Requirements Form';
    public pageMode = "add";
    public Id = null;
    public Requirement: Requirement = null;
    public itemAdded: boolean = false;
    public newRequirement: string = "";
    private requirementId: number = -1;
    //public termStores: Array<TermStoreViewModel>();;
    
    constructor (
    ) {
        SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
        SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.5.1/css/froala_editor.pkgd.css");
    }

    private reset(): void {
        this.Requirement = {
            Id: 0,
            Title: '',
            Details: ''
        };
        console.log("reset(): Resting the form ...");
        //this.Requirement.Title.
    }

    public froalaOptions: Object = { 
        placeholderText: 'Enter the requirement details text here!',
        charCounterCount: false,
        height: 200,
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline','formatOL','formatUL','insertLink','color','undo','redo']
    };

    private getQueryStringValue (key) {  
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }  

    public ngOnInit() {
        console.log("ngOnInit(): Initializing the form ...");
        var requirementId = this.getQueryStringValue("RequirementId");

        console.log("ngOnInit(): RequirementId = " + requirementId);
        if (requirementId)
        {
            if (this.getQueryStringValue("RequirementId") == "edit")
            {
                this.pageMode = "edit";
            }
            else
            {
                // Assume just want to view that item.
                this.pageMode = "view";
            }
            this.populateData(requirementId);
        }
        else
        {
            this.pageMode = "new";
            this.reset();
        }      
    }

    private populateData(requirementId) {
        console.log('populateForm(): Starting ...');

        var self = this;

        pnp.sp.web.lists.getByTitle("Requirements").items.getById(self.requirementId).get().then((result) => {
            this.Requirement = result;
            this.Id = result.Id;
            console.log("result");
            //this.loading = "done";

            this.Requirement = {
                Id: requirementId,
                Title: 'Loading ...',
                Details: ''
            };
        }).catch((e) => { 
            //this.loading = "error";
            console.log("populateForm(): Error. " + e.message);
        });
    }
}