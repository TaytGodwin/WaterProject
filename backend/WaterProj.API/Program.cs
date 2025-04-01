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
    options.AddPolicy("AllowReactApp", // Policy can be called whatevr you want
        policy =>
        {
            policy.WithOrigins("http://localhost:3016","https://thankful-coast-074415f1e.6.azurestaticapps.net") // Make sure this is the right port
                    .AllowCredentials() //  Cookies are added with this
                    .AllowAnyHeader()
                    .AllowAnyMethod(); // Lets you do post, delete, get, etc.
        });
});

var app = builder.Build();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp"); // Add the policy created above


app.UseAuthorization();

app.MapControllers();

app.Run();
