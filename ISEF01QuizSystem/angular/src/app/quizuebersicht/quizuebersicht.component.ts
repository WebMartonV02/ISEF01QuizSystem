import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { QuestionsForQuizRequestDto } from '@proxy/questions';

@Component({
  selector: 'app-quizuebersicht',
  templateUrl: './quizuebersicht.component.html',
  styleUrls: ['./quizuebersicht.component.scss'],
})
export class QuizuebersichtComponent implements OnInit
{
  private parentalQuizId: number;

  constructor(private readonly _activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void
  {
    this.parentalQuizId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  private LoadQuestionsandGivenAnswers(): void
  {
    //let requestDto = { quizId: this.parentalQuizId, previousQuestionOrderNumber: this.actualQuestion.order } as QuestionsForQuizRequestDto;

    //return this._questionService.getByQuizIdWithAnswers(requestDto)
      //.pipe(takeUntil(this._componentDestroyed$));
  }
}
