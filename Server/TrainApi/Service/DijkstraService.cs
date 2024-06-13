using System.Collections.Generic;
using System.Linq;

public class DijkstraService : IDijkstraService
{
    public (List<string> Path, double Distance, double Cost) CalcularRutaMasCorta(Dictionary<string, Estacion> grafo, string inicio, string fin)
    {
        var dist = new Dictionary<string, double>();
        var prev = new Dictionary<string, string>();
        var queue = new List<string>();

        foreach (var v in grafo.Keys)
        {
            dist[v] = double.MaxValue;
            prev[v] = null;
            queue.Add(v);
        }

        dist[inicio] = 0;

        while (queue.Count > 0)
        {
            queue.Sort((x, y) => dist[x].CompareTo(dist[y]));
            var u = queue[0];
            queue.RemoveAt(0);

            if (u == fin)
            {
                var path = new List<string>();
                var temp = fin;

                while (temp != null)
                {
                    path.Insert(0, temp);
                    temp = prev[temp];
                }

                double distance = dist[fin];
                double cost = distance * 25; // Calcular el costo

                return (path, distance, cost);
            }

            foreach (var conexion in grafo[u].Conexiones)
            {
                var alt = dist[u] + conexion.Distancia;
                if (alt < dist[conexion.EstacionDestino])
                {
                    dist[conexion.EstacionDestino] = alt;
                    prev[conexion.EstacionDestino] = u;
                }
            }
        }

        return (null, double.MaxValue, double.MaxValue);
    }
}