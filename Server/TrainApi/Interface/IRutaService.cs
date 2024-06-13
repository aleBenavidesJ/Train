using System.Collections.Generic;

public interface IRutaService
{
    IEnumerable<Ruta> GetRutas();
    void AddRuta(Ruta ruta);
    void UpdateRuta(int id, Ruta ruta);
    void DeleteRuta(int id);
}
