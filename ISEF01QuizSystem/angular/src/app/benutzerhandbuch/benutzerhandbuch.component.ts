import { Component } from '@angular/core';
import { CourseResponseDto, CourseService } from '@proxy/courses';
import { CommentResultDto, CommentService } from '@proxy/comments';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-benutzerhandbuch',
  templateUrl: './benutzerhandbuch.component.html',
  styleUrls: ['./benutzerhandbuch.component.scss'],
})
export class BenutzerhandbuchComponent
{
  public entities:  Array<CourseResponseDto>;
  public comments: Array<CommentResultDto>;
  selectedValue: string;
  currentCourseId: number;

  currentUserId: any;

  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private readonly _courseService: CourseService,
    private readonly _commentsService: CommentService,
    private readonly _router: Router,
    private config: ConfigStateService,
    private readonly _httpClient: HttpClient) {}

  public ngOnInit(): void
  {
    this.LoadCourses();
    this.currentUserId = this.config.getOne("currentUser").id;
  }

  public ngOnDestroy(): void
  {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  public LoadCourses() : void
  {
    this._courseService.getAll()
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((data: Array<CourseResponseDto>) =>
      {
        this.entities = data;
      })
  }
}
