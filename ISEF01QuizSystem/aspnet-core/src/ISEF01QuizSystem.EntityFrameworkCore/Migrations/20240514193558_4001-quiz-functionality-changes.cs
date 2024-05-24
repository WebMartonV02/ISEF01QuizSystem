using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ISEF01QuizSystem.Migrations
{
    /// <inheritdoc />
    public partial class _4001quizfunctionalitychanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsRight",
                table: "AppQuestionEntity",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "OptionId",
                table: "AppAnswerEntity",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AppAnswerEntity_OptionId",
                table: "AppAnswerEntity",
                column: "OptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppAnswerEntity_AppOptionEntity_OptionId",
                table: "AppAnswerEntity",
                column: "OptionId",
                principalTable: "AppOptionEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppAnswerEntity_AppOptionEntity_OptionId",
                table: "AppAnswerEntity");

            migrationBuilder.DropIndex(
                name: "IX_AppAnswerEntity_OptionId",
                table: "AppAnswerEntity");

            migrationBuilder.DropColumn(
                name: "IsRight",
                table: "AppQuestionEntity");

            migrationBuilder.DropColumn(
                name: "OptionId",
                table: "AppAnswerEntity");
        }
    }
}
