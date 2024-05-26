import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UntypedFormGroup } from '@angular/forms';
import { TablePaginationConstants } from '../shared/consts/table-pagination.constants';
import { Subject, takeUntil } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { QuestionCatalogRequestDto, QuestionResponseDto, QuestionService } from '@proxy/questions';
import { ContextMenuActionModel } from '../shared/models/context-menu-action.model';
import { ContextMenuActionFactory } from '../shared/factories/context-menu-action.factory';
import { Router } from '@angular/router';
import { CreateUpdateQuestionProviderService } from './services/create-update-question-provider.service';
import { QuestionCreateOrUpdateViewModel } from './view-models/question-create-update-view.model';

type ResultDtoModel = QuestionResponseDto;

@Component({
  selector: 'app-fragemanager',
  templateUrl: './fragemanager.component.html',
  styleUrls: ['./fragemanager.component.scss'],
})
export class FragemanagerComponent implements OnInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public shiftSearchFilterFormGroup: UntypedFormGroup;
  public columns: Array<string> = new Array<string>(
    "content",
    "order");
  public pageSizeOptions: Array<number> = TablePaginationConstants.PAGE_SIZE_OPTIONS;
  public entities: PagedResultDto<ResultDtoModel> = { items: [], totalCount: 0 } as PagedResultDto<ResultDtoModel>;
  public availableContextActions: Array<ContextMenuActionModel> = new Array<ContextMenuActionModel>();

  private _componentDestroyed$: Subject<void> = new Subject;
  private _requestDto: QuestionCatalogRequestDto = {} as QuestionCatalogRequestDto;

  constructor(public readonly list: ListService<ResultDtoModel>,
              private readonly _questionService: QuestionService,
              private readonly _router: Router,
              private readonly _createUpdateQuestionProviderService: CreateUpdateQuestionProviderService) {}

  ngOnInit(): void
  {
    this.HookGlobalScoreboardDataToList();

    this.InitiateContextMenu();
  }

  public OnPageChange(pageEvent: PageEvent): void
  {
    console.log(pageEvent)
    this.list.maxResultCount = pageEvent.pageSize;
    this.list.page = pageEvent.pageIndex;
  }

  public OnSortChange(sortEvent: Sort): void
  {
    console.log(sortEvent)

    this.list.sortKey = sortEvent.active;
    this.list.sortOrder = sortEvent.direction;

    this.paginator.firstPage();
  }

  public OnSearchPredicateChanged(searchPredicateValue: string): void
  {
    this._requestDto.searchPredicate = searchPredicateValue;
    this.list.getWithoutPageReset();

    this.paginator.firstPage();
  }

  private HookGlobalScoreboardDataToList(): void
  {
    const streamCreator = (query) => this._questionService.getListByQuiz({ ...query, ...this._requestDto});

    console.log(streamCreator)

    this.list.hookToQuery(streamCreator)
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((response) =>
      {
        this.entities = response;
        console.log(this.entities)
      });
  }

  private RouteToCreateOrUpdatePage(element: ResultDtoModel): void
  {
    let questionCreateOrUpdateViewModel = new QuestionCreateOrUpdateViewModel();
    questionCreateOrUpdateViewModel.QuestionId = element.id; // TODO: Use factory pattern, for building the model

    this._createUpdateQuestionProviderService.SetData(questionCreateOrUpdateViewModel);

    this._router.navigate(["/fragenedit"]); // dataprovider service to deliver data, if its update
  }

  private InitiateContextMenu(): void
  {
    this.availableContextActions.push(
      ContextMenuActionFactory.CreateAvailableContextActions('Edit', ((element: ResultDtoModel) => this.RouteToCreateOrUpdatePage(element)), "pen"),
    );
  }
}
