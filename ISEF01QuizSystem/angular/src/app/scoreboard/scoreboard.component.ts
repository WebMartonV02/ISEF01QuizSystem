import { AuthService, ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TablePaginationConstants } from '../shared/consts/table-pagination.constants';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ScoreboardService } from '@proxy/scoreboard';
import { Subject, takeUntil } from 'rxjs';
import { GlobalScoreboardResultDto, ScoreboardGlobalRequestDto } from '@proxy';

type ResultDtoModel = GlobalScoreboardResultDto;

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  providers: [ListService]
})
export class ScoreboardComponent implements OnInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public shiftSearchFilterFormGroup: UntypedFormGroup;
  public columns: Array<string> = new Array<string>(
    "userName",
    "scorePoint");
  public pageSizeOptions: Array<number> = TablePaginationConstants.PAGE_SIZE_OPTIONS;
  public entities: PagedResultDto<ResultDtoModel> = { items: [], totalCount: 0 } as PagedResultDto<ResultDtoModel>;

  private _componentDestroyed$: Subject<void> = new Subject;
  private globalRequestDto: ScoreboardGlobalRequestDto = { courseId: 1, searchPredicate: ''} as ScoreboardGlobalRequestDto;

  constructor(public readonly list: ListService<ResultDtoModel>,
  private readonly _scoreboardService: ScoreboardService) {}

  ngOnInit(): void
  {
    this.HookScoreboardDataToList();
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
    this.globalRequestDto.searchPredicate = searchPredicateValue;
    this.list.getWithoutPageReset();

    this.paginator.firstPage();
  }

  private HookScoreboardDataToList(): void
  {
    const streamCreator = (query) => this._scoreboardService.getCalculatedGlobalScoreboardForQuizByRequestDto({ ...query, ...this.globalRequestDto});

    console.log(streamCreator)

    this.list.hookToQuery(streamCreator)
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((response) =>
      {
        this.entities = response;
        console.log(this.entities)
      });
  }
}
