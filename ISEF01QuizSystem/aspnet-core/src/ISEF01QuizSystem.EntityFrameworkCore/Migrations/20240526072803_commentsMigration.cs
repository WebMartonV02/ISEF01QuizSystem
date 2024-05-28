using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ISEF01QuizSystem.Migrations
{
    /// <inheritdoc />
    public partial class commentsMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppCommentEntity_AppQuizEntity_QuizId",
                table: "AppCommentEntity");

            migrationBuilder.RenameColumn(
                name: "QuizId",
                table: "AppCommentEntity",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_AppCommentEntity_QuizId",
                table: "AppCommentEntity",
                newName: "IX_AppCommentEntity_CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppCommentEntity_AppCourseEntity_CourseId",
                table: "AppCommentEntity",
                column: "CourseId",
                principalTable: "AppCourseEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppCommentEntity_AppCourseEntity_CourseId",
                table: "AppCommentEntity");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "AppCommentEntity",
                newName: "QuizId");

            migrationBuilder.RenameIndex(
                name: "IX_AppCommentEntity_CourseId",
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
    }
}
