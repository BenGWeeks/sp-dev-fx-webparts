import { Taxonomy } from './taxonomy.model';
import { TermBase } from './termbase.model';
import { Term } from './term.model';
import {
  ITermBase,
  ITermStore,
  ITermSet,
  ITermGroup,
  ITerm,
  ILabel
} from './taxonomy.entities';

/**
 * Term Set View Model
 */
export class TermSet extends TermBase {
  /**
   * Term Set entity
   */
  private entity: ITermSet;
  /**
   * Description
   */
  protected description: string;
  /**
   * collection of viewmodels for nested terms
   */
  //protected terms: KnockoutObservableArray<TermViewModel>;
  protected terms: Array<Term>;

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: Taxonomy, entity: ITermSet) {
    super(model, entity);

    this.entity = entity;
    this.description = entity.description;
    //this.terms = ko.observableArray<TermViewModel>();
    this.terms = Array<Term>();
  }

  /**
   * Expand\collapse click handler
   */
  protected actionClick(ev: MouseEvent): void {
    //this.isExpanded(!this.isExpanded());
    this.isExpanded =!this.isExpanded;

    window.console && console.log("termSet.actionClick() called.");

    //const isExpanded = this.isExpanded();
    const isExpanded = this.isExpanded;

    if (isExpanded) {
      //const unwrappedTerms = ko.utils.unwrapObservable(this.terms);
      const unwrappedTerms = this.terms;     

      if (!unwrappedTerms || !unwrappedTerms.length) {
        this.model.getTerms(this.entity).then((terms) => {
          const termViewModels: Term[] = [];
          terms.forEach((value) => {
            termViewModels.push(new Term(this.model, value));
          });

          //this.terms(termViewModels);
          this.terms = termViewModels;
        });
      }
    }
  }
}