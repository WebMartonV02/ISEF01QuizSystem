import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseResponseDto, CourseService } from '@proxy/courses';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy
{
  public entities:  Array<CourseResponseDto>;

  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private readonly _courseService: CourseService,
    private readonly _router: Router) {}

  public ngOnInit(): void
  {
    this.LoadCourses();
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

  public RouteToQuiz(entity: CourseResponseDto) :  void
  {
    // dataProviderService to pass the courseEntity or at least the

    let _ = this._router.navigate(['/quizes']);
  }
}
