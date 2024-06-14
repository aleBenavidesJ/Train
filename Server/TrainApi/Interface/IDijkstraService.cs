using System.Collections.Generic;

public interface IDijkstraService
{
    (List<string> Path, double Distance, double Cost) CalcularRutaMasCorta(Dictionary<string, Estacion> grafo, string inicio, string fin);
}