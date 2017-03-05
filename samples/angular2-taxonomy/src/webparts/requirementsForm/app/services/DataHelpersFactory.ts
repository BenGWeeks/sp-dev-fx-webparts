import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
//import { EnvironmentType } from '@microsoft/sp-client-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IDataHelper } from './DataHelperBase';
import { DataHelperMock } from './DataHelperMock';
import { DataHelperSP } from './DataHelperSP';

/**
 * Factory object to create data helper based on current EnvironmentType
 */
export class DataHelpersFactory {
  /**
   * API to create data helper
   * @context: web part context
   */
  public static createDataHelper(context: IWebPartContext): IDataHelper {
    //if (context.environment.type === EnvironmentType.Local) {
    if (Environment.type === EnvironmentType.Local) {
      return new DataHelperMock();
    }
    else {
      return new DataHelperSP(context);
    }
  }
}