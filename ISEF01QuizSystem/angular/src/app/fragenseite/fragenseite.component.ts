import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { QuestionResponseDto, QuestionService, QuestionsForQuizRequestDto } from '@proxy/questions';
import { OptionResponseDto } from '@proxy/options';

type ResultDtoModel = QuestionResponseDto;

@Component({
  selector: 'app-fragenseite',
  templateUrl: './fragenseite.component.html',
  styleUrls: ['./fragenseite.component.scss'],
})
export class FragenseiteComponent implements OnInit, OnDestroy
{
  public actualQuestion: ResultDtoModel = {} as ResultDtoModel;
  public choosenOption: OptionResponseDto;
  public choosenOptiocLogicalValue: boolean;
  public clickedOptionEvaluated$ = new Subject();

  private parentalQuizId: number;
  private _componentDestroyed$: Subject<void> = new Subject();
  private _activateNextQuestionLoad: Subject<void> = new Subject();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _questionService: QuestionService,
    private readonly _router: Router) {}

  public ngOnInit(): void
  {
    this.parentalQuizId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.parentalQuizId)

    this.SubscribeToNextQuestionEvent();

    this.LoadNextQuestion();
  }

  public ngOnDestroy(): void
  {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();

    this._activateNextQuestionLoad.complete();
  }

  public LoadNextQuestion(): void
  {
    this._activateNextQuestionLoad.next();
  }

  public EvaluateChoosenOption(option: OptionResponseDto): void
  {
    this.choosenOptiocLogicalValue = false;
    this.choosenOption = option;

    if (option.isCorrect == true)
    {
      this.choosenOptiocLogicalValue = true;

      this.clickedOptionEvaluated$.next(this.choosenOptiocLogicalValue);
      console.log(option)
    }

    this.clickedOptionEvaluated$.next(this.choosenOptiocLogicalValue);
  }

  private RouteToOverViewPage(): void
  {
    let _ = this._router.navigate(['/fragenubersicht']);
  }

  private SubscribeToNextQuestionEvent(): void
  {
    this._activateNextQuestionLoad
      .pipe(
        takeUntil(this._componentDestroyed$),
        switchMap(() =>
        {
          return this.ExecuteQuestionLoadWorkflow();
        }))
      .subscribe((data: ResultDtoModel) =>
      {
        this.actualQuestion = data;

        if (this.actualQuestion == null)
        {
          this.RouteToOverViewPage();
        }
      });
  }

  private ExecuteQuestionLoadWorkflow(): Observable<ResultDtoModel>
  {
    let requestDto = { quizId: this.parentalQuizId, previousQuestionId: this.actualQuestion.id } as QuestionsForQuizRequestDto;

    return this._questionService.getByQuizIdWithAnswers(requestDto)
      .pipe(takeUntil(this._componentDestroyed$));
  }
}
