import { Component } from '@angular/core';
import { CourseResponseDto, CourseService } from '@proxy/courses';
import { CommentResultDto, CommentService } from '@proxy/comments';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';

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

  questionTitle: string;
  questionComment: string;
  currentUserId: any;

  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private readonly _courseService: CourseService,
    private readonly _commentsService: CommentService,
    private readonly _router: Router,
    private config: ConfigStateService) {}

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

  public LoadComments(): void
  {
    this._commentsService.getCommentsOrderedForCourseByCourseId(this.currentCourseId)
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((data: Array<CommentResultDto>) =>
      {
        console.log(data);
        this.comments = data;
      })
  }

  public RouteToQuiz(courseId: number) :  void
  {
    let _ = this._router.navigate(['/quizes', courseId]);
  }

  public publish() {
    const currentUserId = this.config.getOne("currentUser").id;

    var result = this._commentsService.createCommentForCourseByRequestDto({
      id: this.comments.length+2, courseId: this.currentCourseId, content: this.questionComment, userId: currentUserId
    }).
    pipe(takeUntil(this._componentDestroyed$))
      .subscribe((response) =>
      {
        this.LoadComments();
        this.questionComment = '';
        console.log(response)
      })
  }

  public courseChanged(value: string) {
    this.currentCourseId = this.getIdFromCourse(value);
    this.LoadComments();
  }

  private getIdFromCourse(name: string) : number{
    for(var i = 0; i< this.entities.length; i++) {
      if(this.entities[i].title === this.selectedValue){
        return this.entities[i].id;
      }
    }
    return 0;
  }

  public deleteComment(commentId: number) {
    var result = this._commentsService.deleteCommentByCommentId(commentId).
    pipe(takeUntil(this._componentDestroyed$))
      .subscribe((response) =>
      {
        this.LoadComments();
        this.questionComment = '';
        console.log(response)
      })
  }
}
