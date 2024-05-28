DELETE FROM public."AppAnswerEntity";
DELETE FROM public."AppAttemptEntity";
DELETE FROM public."AppCommentEntity";
DELETE FROM public."AppCourseEntity";
DELETE FROM public."AppOptionEntity";
DELETE FROM public."AppQuestionEntity";
DELETE FROM public."AppQuizEntity";


-- Courses
INSERT INTO public."AppCourseEntity"("Id", "Title", "Description") VALUES (1, 'IT-Recht', 'IT-Recht');
INSERT INTO public."AppCourseEntity"("Id", "Title", "Description") VALUES (2, 'IT-Projektmanagement', 'IT-Projektmanagement');

-- Quizes
INSERT INTO public."AppQuizEntity"("Id", "Title", "Description", "CourseId") VALUES (1, 'Online Test Lektion 1', 'Test', 1);
INSERT INTO public."AppQuizEntity"("Id", "Title", "Description", "CourseId") VALUES (2, 'Online Test Lektion 2', 'Test', 1);

-- Questions
INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (1, 1, 'Wie viele Bücher hat das Bürgerliche Gesetzbuch (BGB)?', 1);

-- Options
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (1, 1, '1', true);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (2, 1, '2', false);