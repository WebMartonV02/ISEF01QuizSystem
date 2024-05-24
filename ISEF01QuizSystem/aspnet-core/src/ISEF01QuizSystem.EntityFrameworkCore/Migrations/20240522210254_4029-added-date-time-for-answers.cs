using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ISEF01QuizSystem.Migrations
{
    /// <inheritdoc />
    public partial class _4029addeddatetimeforanswers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDateTime",
                table: "AppAnswerEntity",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDateTime",
                table: "AppAnswerEntity");
        }
    }
}
