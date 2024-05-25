import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comments } from '@proxy';
import { CommentService } from '@proxy/comments';
import { CourseResponseDto, CourseService } from '@proxy/courses';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-quizhub',
  templateUrl: './quizhub.component.html',
  styleUrls: ['./quizhub.component.scss'],
})
export class QuizhubComponent {
  public entities:  Array<CourseResponseDto>;
  selectedValue: string;

  questionTitle: string;
  questionComment: string;

  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private readonly _courseService: CourseService,
    private readonly _commentsService: CommentService, 
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

  public RouteToQuiz(courseId: number) :  void
  {
    let _ = this._router.navigate(['/quizes', courseId]);
  }

  public publish() {
    
  }
}
