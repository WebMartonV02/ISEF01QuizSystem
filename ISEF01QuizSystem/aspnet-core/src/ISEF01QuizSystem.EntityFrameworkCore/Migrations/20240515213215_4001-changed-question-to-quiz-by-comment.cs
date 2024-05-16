using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ISEF01QuizSystem.Migrations
{
    /// <inheritdoc />
    public partial class _4001changedquestiontoquizbycomment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppCommentEntity_AppQuestionEntity_QuestionId",
                table: "AppCommentEntity");

            migrationBuilder.DropColumn(
                name: "IsRight",
                table: "AppQuestionEntity");

            migrationBuilder.RenameColumn(
                name: "QuestionId",
                table: "AppCommentEntity",
                newName: "QuizId");

            migrationBuilder.RenameIndex(
                name: "IX_AppCommentEntity_QuestionId",
                table: "AppCommentEntity",
                newName: "IX_AppCommentEntity_QuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppCommentEntity_AppQuizEntity_QuizId",
                table: "AppCommentEntity",
                column: "QuizId",
                principalTable: "AppQuizEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppCommentEntity_AppQuizEntity_QuizId",
                table: "AppCommentEntity");

            migrationBuilder.RenameColumn(
                name: "QuizId",
                table: "AppCommentEntity",
                newName: "QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_AppCommentEntity_QuizId",
                table: "AppCommentEntity",
                newName: "IX_AppCommentEntity_QuestionId");

            migrationBuilder.AddColumn<bool>(
                name: "IsRight",
                table: "AppQuestionEntity",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_AppCommentEntity_AppQuestionEntity_QuestionId",
                table: "AppCommentEntity",
                column: "QuestionId",
                principalTable: "AppQuestionEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
