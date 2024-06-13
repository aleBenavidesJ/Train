using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration; // Agregado
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

// Acceder a la configuración directamente desde el builder
var configuration = builder.Configuration;

builder.Services.AddCors(opciones =>
{
    var frontendURL = configuration.GetValue<string>("frontend_url");
    opciones.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontendURL)
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Register your services
builder.Services.AddScoped<IReservacionService, ReservacionService>();
builder.Services.AddScoped<ITiqueteService, TiqueteService>();
builder.Services.AddScoped<IDijkstraService, DijkstraService>();

// Aquí se corrige el registro de IRutaService
builder.Services.AddSingleton<IRutaService, RutaService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
var env = app.Services.GetRequiredService<IHostEnvironment>(); // Obtener el entorno de ejecución

if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Página de errores detallada en desarrollo
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty; // Servir Swagger UI en la raíz de la aplicación
        c.DocExpansion(DocExpansion.None); // Colapsar la documentación por defecto
    });
}
else
{
    app.UseExceptionHandler("/error"); // Manejo de errores en producción
}

app.UseCors(); // Habilitar CORS
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Mapear endpoints de controllers
});

app.Run();
