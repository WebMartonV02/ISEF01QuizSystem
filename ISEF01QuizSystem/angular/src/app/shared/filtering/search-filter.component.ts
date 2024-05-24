import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnDestroy
{
  @Output() searchPredicateChanged = new EventEmitter<string>();

  public form = new UntypedFormGroup({ searchPredicate: new UntypedFormControl('') });
  private _componentDestroyed$: Subject<boolean> = new Subject();
  
  constructor() 
  { 
    this.form.get("searchPredicate").valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this._componentDestroyed$)
      ).subscribe((searchPredicateValue: string) => 
      {
        this.searchPredicateChanged.emit(searchPredicateValue);
      });
  }

  ngOnDestroy(): void
  {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  public ClearSearchField(): void
  {
    this.form.get("searchPredicate").reset();
  }
}
