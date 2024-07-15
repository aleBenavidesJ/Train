using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

public class RutaService : IRutaService
{
    private readonly List<Ruta> _rutas = new List<Ruta>();
    private readonly ILogger<RutaService> _logger;

    public RutaService(ILogger<RutaService> logger)
    {
        _logger = logger;
    }

    public IEnumerable<Ruta> GetRutas()
    {
        return _rutas;
    }

    public void AddRuta(Ruta ruta)
    {
        _rutas.Add(ruta);
        _logger.LogInformation($"Se agregó una nueva ruta: {ruta.PuntoInicio} - {ruta.PuntoFinal}");
    }

    public void UpdateRuta(int id, Ruta ruta)
    {
        var existingRuta = _rutas.FirstOrDefault(r => r.Id == id);
        if (existingRuta != null)
        {
            existingRuta.PuntoInicio = ruta.PuntoInicio;
            existingRuta.PuntoFinal = ruta.PuntoFinal;
            existingRuta.Distancia = ruta.Distancia;
            _logger.LogInformation($"Se actualizó la ruta con ID {id}");
        }
    }

    public void DeleteRuta(int id)
    {
        var ruta = _rutas.FirstOrDefault(r => r.Id == id);
        if (ruta != null)
        {
            _rutas.Remove(ruta);
            _logger.LogInformation($"Se eliminó la ruta con ID {id}");
        }
    }
}