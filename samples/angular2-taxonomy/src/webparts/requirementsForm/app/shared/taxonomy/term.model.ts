import { Taxonomy } from './taxonomy.model';
import { TermBase } from './termbase.model';
import {
  ITermBase,
  ITermStore,
  ITermSet,
  ITermGroup,
  ITerm,
  ILabel
} from './taxonomy.entities';

/**
 * Term ViewModel
 */
export class Term extends TermBase {
  /**
   * Term emtity
   */
  private entity: ITerm;
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
   * Flag if current term has child terms
   */
  protected hasChildTerms: boolean;
  /**
   * Term's  labels
   */
  protected labels: ILabel[];

  /**
   * ctor
   * @param model: taxonomy control model
   * @param entity: entity that is underline current view model
   */
  constructor(model: Taxonomy, entity: ITerm) {
    super(model, entity);

    this.entity = entity;
    this.description = entity.description;
    //this.terms = ko.observableArray<TermViewModel>();
    this.terms = Array<Term>();
    this.hasChildTerms = entity.termsCount > 0;
    this.labels = entity.labels;
  }

  /**
   * Expand\collapse click handler
   */
  protected actionClick(ev: MouseEvent): void {
    //this.isExpanded(!this.isExpanded());
    this.isExpanded =!this.isExpanded;

    window.console && console.log("term.actionClick() called.");

    //const isExpanded = this.isExpanded();
    const isExpanded = this.isExpanded;

    if (isExpanded) {
      //const unwrappedTerms = ko.utils.unwrapObservable(this.terms);
      const unwrappedTerms = this.terms;

      if (!unwrappedTerms || !unwrappedTerms.length) {
        this.model.getChildTerms(this.entity).then((terms) => {
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
