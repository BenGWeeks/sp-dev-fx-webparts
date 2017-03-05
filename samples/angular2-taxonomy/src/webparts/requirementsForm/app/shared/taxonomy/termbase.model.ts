import { Taxonomy } from './taxonomy.model';
import {
  ITermBase,
  ITermStore,
  ITermSet,
  ITermGroup,
  ITerm,
  ILabel
} from './taxonomy.entities';

/**
 * Base viewmodel for all Taxonomy objects
 */

export class TermBase {
  public id: string;
  public name: string;
  //protected isExpanded: KnockoutObservable<boolean>;
  protected isExpanded: boolean;
  /**
   * Model
   */
  protected model: Taxonomy;

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: Taxonomy, entity: ITermBase) {
    this.model = model;
    //this.isExpanded = ko.observable<boolean>(false);
    this.isExpanded = false;
    this.id = entity.id;
    this.name = entity.name;
  }
}