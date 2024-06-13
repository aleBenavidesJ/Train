using System.Collections.Generic;
using System.Linq;

public class RutaService : IRutaService
{
    private readonly List<Ruta> _rutas = new List<Ruta>();

    public IEnumerable<Ruta> GetRutas()
    {
        return _rutas;
    }

    public void AddRuta(Ruta ruta)
    {
        _rutas.Add(ruta);
    }

    public void UpdateRuta(int id, Ruta ruta)
    {
        var existingRuta = _rutas.FirstOrDefault(r => r.Id == id);
        if (existingRuta != null)
        {
            existingRuta.PuntoInicio = ruta.PuntoInicio;
            existingRuta.PuntoFinal = ruta.PuntoFinal;
            existingRuta.Distancia = ruta.Distancia;
        }
    }

    public void DeleteRuta(int id)
    {
        var ruta = _rutas.FirstOrDefault(r => r.Id == id);
        if (ruta != null)
        {
            _rutas.Remove(ruta);
        }
    }
}
