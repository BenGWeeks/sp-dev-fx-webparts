import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './RequirementsForm.module.scss';
import * as strings from 'requirementsFormStrings';
import { IRequirementsFormWebPartProps } from './IRequirementsFormWebPartProps';

// Start Angular Changes
import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
// End Angular Changes


export default class RequirementsFormWebPart extends BaseClientSideWebPart<IRequirementsFormWebPartProps> {

public render(): void {
    this.domElement.innerHTML = `
    <app-root></app-root>
    `;
    platformBrowserDynamic().bootstrapModule(AppModule);

  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
