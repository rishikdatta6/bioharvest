using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BioHarvest.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddHistoryTableV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Histories_AspNetUsers_UserId",
                table: "Histories");

            migrationBuilder.DropIndex(
                name: "IX_Histories_UserId",
                table: "Histories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Histories");

            migrationBuilder.RenameColumn(
                name: "PH",
                table: "Histories",
                newName: "pH");

            migrationBuilder.RenameColumn(
                name: "AQI",
                table: "Histories",
                newName: "Aqi");

            migrationBuilder.AddColumn<string>(
                name: "UserKey",
                table: "Histories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserKey",
                table: "Histories");

            migrationBuilder.RenameColumn(
                name: "pH",
                table: "Histories",
                newName: "PH");

            migrationBuilder.RenameColumn(
                name: "Aqi",
                table: "Histories",
                newName: "AQI");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Histories",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Histories_UserId",
                table: "Histories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Histories_AspNetUsers_UserId",
                table: "Histories",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
