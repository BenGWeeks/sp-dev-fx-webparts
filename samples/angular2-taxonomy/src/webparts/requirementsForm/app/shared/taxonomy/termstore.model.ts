import { Taxonomy } from './taxonomy.model';
import { TermBase } from './termbase.model';
import { TermGroup } from './termgroup.model';
import {
  ITermBase,
  ITermStore,
  ITermSet,
  ITermGroup,
  ITerm,
  ILabel
} from './taxonomy.entities';

/**
 * Term store viewmodel
 */
export class TermStore extends TermBase {
  /**
   * Term store entity
   */
  private entity: ITermStore;
  /**
   * collection of viewmodels for term store groups
   */
  //protected termGroups: KnockoutObservableArray<TermGroupViewModel>;
  protected termGroups: Array<TermGroup>;

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: Taxonomy, entity: ITermStore) {
    super(model, entity);
    this.entity = entity;
    //this.termGroups = ko.observableArray<TermGroupViewModel>();
    this.termGroups = Array<TermGroup>();
  }

  /**
   * Expand\collapse click handler
   */
  protected actionClick(ev: MouseEvent): void {
    //this.isExpanded(!this.isExpanded());
    this.isExpanded = !this.isExpanded;
    
    window.console && console.log("termStore.actionClick() called.");

    //const isExpanded = this.isExpanded();
    const isExpanded = this.isExpanded;

    if (isExpanded) {
      //const unwrappedGroups = ko.utils.unwrapObservable(this.termGroups);
      const unwrappedGroups = this.termGroups;

      if (!unwrappedGroups || !unwrappedGroups.length) {
        this.model.getTermGroups(this.entity).then((termGroups) => {
          const termGroupViewModels: TermGroup[] = [];
          termGroups.forEach((value) => {
            termGroupViewModels.push(new TermGroup(this.model, value));
          });

          //this.termGroups(termGroupViewModels);
          this.termGroups = termGroupViewModels;
        });
      }
    }
  }
}
