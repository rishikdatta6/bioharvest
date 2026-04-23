using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BioHarvest.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemovedPhosphorusfromHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phosphorus",
                table: "Histories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Phosphorus",
                table: "Histories",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
