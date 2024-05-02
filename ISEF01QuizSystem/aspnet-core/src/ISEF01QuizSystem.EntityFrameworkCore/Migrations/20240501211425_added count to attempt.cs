using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ISEF01QuizSystem.Migrations
{
    /// <inheritdoc />
    public partial class addedcounttoattempt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "AppCommentEntity",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "AppAttemptEntity",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "AppCommentEntity");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "AppAttemptEntity");
        }
    }
}
