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
INSERT INTO public."AppQuizEntity"("Id", "Title", "Description", "CourseId") VALUES (1, 'IT-Recht Lektion 1', 'IT-Recht Lektion 1', 1);
INSERT INTO public."AppQuizEntity"("Id", "Title", "Description", "CourseId") VALUES (2, 'IT-Recht Lektion 2', 'IT-Recht Lektion 2', 1);
INSERT INTO public."AppQuizEntity"("Id", "Title", "Description", "CourseId") VALUES (3, 'IT-Projektmanagement Lektion 1', 'IT-Projektmanagement Lektion 1', 2);
INSERT INTO public."AppQuizEntity"("Id", "Title", "Description", "CourseId") VALUES (4, 'IT-Projektmanagement Lektion 2', 'IT-Projektmanagement Lektion 2', 2);

-- Questions
INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (1, 1, 'Was versteht man unter Urheberrecht im Kontext von Software?', 1);
INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (2, 1, 'Welche Aussage beschreibt am besten den Zweck von Datenschutzgesetzen?', 2);
INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (3, 1, 'Was regelt das Gesetz zur digitalen Signatur?', 3);
INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (4, 2, 'Was ist ein Service-Level-Agreement (SLA)?', 1);
INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (5, 2, 'Was sollte in einem IT-Projektvertrag klar definiert sein?', 2);
INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (6, 2, 'Was kennzeichnet eine „Indemnity“-Klausel in einem IT-Vertrag?', 3);

INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (7, 3, 'Was ist das primäre Ziel des Projektmanagements?', 1);
INSERT INTO public."AppQuestionEntity"("Id", "QuizId", "Content", "Order") VALUES (8, 4, 'Welches Tool wird häufig für Agile Projektmanagement verwendet?', 1);


-- Options
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (1, 1, 'A) Das Recht, Software zu benutzen', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (2, 1, 'B) Das Recht des Entwicklers oder Autors auf Schutz seiner Software-Kreation', true);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (3, 1, 'C) Das Recht, Software ohne Lizenz zu vertreiben', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (4, 1, 'D) Das Recht auf Datenschutz bei Softwarenutzung', false);

INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (5, 2, 'A) Schutz der Software vor Piraterie', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (6, 2, 'B) Schutz der persönlichen Daten von Individuen', true);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (7, 2, 'C) Regulierung der Internetgeschwindigkeiten', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (8, 2, 'D) Lizenzierung von IT-Fachkräften', false);

INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (9, 3, 'A) Die Verschlüsselung von E-Mails', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (10, 3, 'B) Den Verkauf von Software-Lizenzen', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (11, 3, 'C) Die Authentizität und Integrität digitaler Dokumente', true);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (12, 3, 'D) Die Speicherung von Daten in der Cloud', false);

INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (13, 4, 'A) Ein Vertrag, der die erwartete Leistungsebene eines Dienstes definiert', true);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (14, 4, 'B) Ein Vertrag zum Kauf von IT-Hardware', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (15, 4, 'C) Eine Lizenzvereinbarung für Endbenutzer', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (16, 4, 'D) Eine Datenschutzrichtlinie', false);

INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (17, 5, 'A) Die Farbe der zu liefernden Hardware', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (18, 5, 'B) Der Umfang der zu erbringenden Dienstleistungen', true);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (19, 5, 'C) Die Namen aller Mitarbeiter im Projektteam', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (20, 5, 'D) Die Marke der verwendeten Software', false);

INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (21, 6, 'A) Eine Partei stimmt zu, die andere vor bestimmten Haftungen oder Verlusten zu schützen', true);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (22, 6, 'B) Eine Klausel, die automatische Vertragsverlängerungen regelt', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (23, 6, 'C) Die Festlegung von Strafen bei Nichterfüllung', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (24, 6, 'D) Die Definition von Standard-Software', false);

INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (25, 7, 'A) Kosten zu minimieren', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (26, 7, 'B) Die Qualität der Lieferobjekte sicherstellen', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (27, 7, 'C) Projekte so schnell wie möglich abzuschließen', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (28, 7, 'D) Projekte innerhalb des festgelegten Zeit- und Budgetrahmens erfolgreich abzuschließen', true);

INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (29, 8, 'A) Jira', true);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (30, 8, 'B) SAP', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (31, 8, 'C) Oracle', false);
INSERT INTO public."AppOptionEntity"("Id", "QuestionId", "Text", "IsCorrect") VALUES (32, 8, 'D) Microsoft Excel', false);
