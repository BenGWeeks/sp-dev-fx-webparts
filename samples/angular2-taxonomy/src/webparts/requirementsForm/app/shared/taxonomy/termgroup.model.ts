import { Taxonomy } from './taxonomy.model';
import { TermBase } from './termbase.model';
import { TermSet } from './termset.model';
import {
  ITermBase,
  ITermStore,
  ITermSet,
  ITermGroup,
  ITerm,
  ILabel
} from './taxonomy.entities';

/**
 * Term Group ViewModel
 */
export class TermGroup extends TermBase {
  private entity: ITermGroup;
  protected description: string;
  //protected termSets: KnockoutObservableArray<TermSetViewModel>;
  protected termSets: Array<TermSet>;

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: Taxonomy, entity: ITermGroup) {
    super(model, entity);

    this.entity = entity;
    this.description = entity.description;
    //this.termSets = ko.observableArray<TermSetViewModel>();
    this.termSets = Array<TermSet>();
  }

  /**
   * Expand\collapse click handler
   */
  protected actionClick(ev: MouseEvent): void {
    //this.isExpanded(!this.isExpanded());
    this.isExpanded = !this.isExpanded;

    window.console && console.log("termGroup.actionClick() called.");

    //const isExpanded = this.isExpanded();
    const isExpanded = this.isExpanded;

    if (isExpanded) {
      //const unwrappedSets = ko.utils.unwrapObservable(this.termSets);
      const unwrappedSets = this.termSets;

      if (!unwrappedSets || !unwrappedSets.length) {
        this.model.getTermSets(this.entity).then((termSets) => {
          const termSetViewModels: TermSet[] = [];
          termSets.forEach((value) => {
            termSetViewModels.push(new TermSet(this.model, value));
          });

          //this.termSets(termSetViewModels);
          this.termSets = termSetViewModels;
        });
      }
    }
  }
}