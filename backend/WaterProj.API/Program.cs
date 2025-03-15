using Microsoft.EntityFrameworkCore;
using WaterProj.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<WaterDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("WaterConnection")));

builder.Services.AddCors(options =>// Add options to enable cookies
{
    options.AddPolicy("AllowFrontend", // Policy can be called whatevr you want
        policy =>
        {
            policy.WithOrigins("http://localhost:3015") // Make sure this is the right port
                    .AllowCredentials() //  Cookies are added with this
                    .AllowAnyHeader()
                    .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend"); // Add the policy created above

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
