import { AuthService, ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TablePaginationConstants } from '../shared/consts/table-pagination.constants';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ScoreboardService } from '@proxy/scoreboard';
import { Subject, takeUntil } from 'rxjs';
import { GlobalScoreboardResultDto } from '@proxy';

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
    "stationName",
    "employeeFullName",
    "skillLevelName",
    "trainerEmployeeName",
    "homeShiftVariationName",
    "shiftSegmentVariation");
  public pageSizeOptions: Array<number> = TablePaginationConstants.PAGE_SIZE_OPTIONS;

  private _componentDestroyed$: Subject<void>;

  constructor(public readonly list: ListService<ResultDtoModel>,
  private readonly _scoreboardService: ScoreboardService) {}

  ngOnInit(): void
  {
    this.HookEmployeeStationAssignmentDataToList();
  }

  public OnPageChange(pageEvent: PageEvent): void
  {
    this.list.maxResultCount = pageEvent.pageSize;
    this.list.page = pageEvent.pageIndex;
  }

  public OnSortChange(sortEvent: Sort): void
  {
    this.list.sortKey = sortEvent.active;
    this.list.sortOrder = sortEvent.direction;

    this.paginator.firstPage();
  }

  private HookEmployeeStationAssignmentDataToList(): void
  {
    const streamCreator = (query) => this._scoreboardService.getCalculatedGlobalScoreboardForQuizByCourseId({ ...query});

    this.list.hookToQuery(streamCreator)
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((response) =>
      {

      });
  }
}
