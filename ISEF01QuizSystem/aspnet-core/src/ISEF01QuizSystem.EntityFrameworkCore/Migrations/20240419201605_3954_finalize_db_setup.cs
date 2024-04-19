using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ISEF01QuizSystem.Migrations
{
    /// <inheritdoc />
    public partial class _3954_finalize_db_setup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "AppQuizEntity",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AppAnswerEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuestionId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAnswerEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppAnswerEntity_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppAnswerEntity_AppQuestionEntity_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "AppQuestionEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppAttemptEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    QuizId = table.Column<int>(type: "integer", nullable: false),
                    Score = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAttemptEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppAttemptEntity_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppAttemptEntity_AppQuizEntity_QuizId",
                        column: x => x.QuizId,
                        principalTable: "AppQuizEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppCommentEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    QuestionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppCommentEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppCommentEntity_AppQuestionEntity_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "AppQuestionEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppCourseEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppCourseEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppOptionEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuestionId = table.Column<int>(type: "integer", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    IsCorrect = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppOptionEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppOptionEntity_AppQuestionEntity_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "AppQuestionEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppQuizEntity_CourseId",
                table: "AppQuizEntity",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAnswerEntity_QuestionId",
                table: "AppAnswerEntity",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAnswerEntity_UserId",
                table: "AppAnswerEntity",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAttemptEntity_QuizId",
                table: "AppAttemptEntity",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAttemptEntity_UserId",
                table: "AppAttemptEntity",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AppCommentEntity_QuestionId",
                table: "AppCommentEntity",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_AppOptionEntity_QuestionId",
                table: "AppOptionEntity",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppQuizEntity_AppCourseEntity_CourseId",
                table: "AppQuizEntity",
                column: "CourseId",
                principalTable: "AppCourseEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppQuizEntity_AppCourseEntity_CourseId",
                table: "AppQuizEntity");

            migrationBuilder.DropTable(
                name: "AppAnswerEntity");

            migrationBuilder.DropTable(
                name: "AppAttemptEntity");

            migrationBuilder.DropTable(
                name: "AppCommentEntity");

            migrationBuilder.DropTable(
                name: "AppCourseEntity");

            migrationBuilder.DropTable(
                name: "AppOptionEntity");

            migrationBuilder.DropIndex(
                name: "IX_AppQuizEntity_CourseId",
                table: "AppQuizEntity");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "AppQuizEntity");
        }
    }
}
