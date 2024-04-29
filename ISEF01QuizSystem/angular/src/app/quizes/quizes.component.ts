import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '@proxy/quizes';
import { CourseResponseDto } from '@proxy/courses';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss'],
})
export class QuizesComponent implements OnInit, OnDestroy
{
  public parentEntity: CourseResponseDto;
  public entities:  Array<CourseResponseDto>;

  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(private readonly _quizService: QuizService) {}

  public ngOnInit(): void
  {
    this.LoadCourses(1); // read the course id form the DataProviderService
  }

  public ngOnDestroy(): void
  {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  public LoadCourses(courseId:  number) : void
  {
    this._quizService.getByCourseIdOrdered(courseId)
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((data: Array<CourseResponseDto>) =>
      {
        this.entities = data;
      })
  }
}
