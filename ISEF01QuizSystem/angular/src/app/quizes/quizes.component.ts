import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '@proxy/quizes';
import { CourseResponseDto, CourseService } from '@proxy/courses';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss'],
})
export class QuizesComponent implements OnInit, OnDestroy
{
  public parentEntity: CourseResponseDto = {} as CourseResponseDto;
  public entities:  Array<CourseResponseDto> = new Array<CourseResponseDto>;

  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(private readonly _quizService: QuizService,
              private readonly _courseService: CourseService,
              private readonly _activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void
  {
    var parentalCourseId = this._activatedRoute.snapshot.paramMap.get('id');

    console.log(parentalCourseId)

    this.LoadCourses(parseInt(parentalCourseId));
  }

  public ngOnDestroy(): void
  {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  public LoadCourses(courseId:  number) : void
  {
    this._courseService.getById(courseId)
      .pipe(
        takeUntil(this._componentDestroyed$),
        switchMap((data: CourseResponseDto) =>
        {
          this.parentEntity = data;

          return this._quizService.getByCourseIdOrdered(courseId);
        }))
      .subscribe((data: Array<CourseResponseDto>) =>
      {
        this.entities = data;
        console.log(this.entities)
      });
  }
}
