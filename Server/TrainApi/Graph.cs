using System.Collections.Generic;

public static class Graph
{
    public static Dictionary<string, Estacion> CrearGrafo()
    {
        var grafo = new Dictionary<string, Estacion>
        {
            { "Moravia", new Estacion { Nombre = "Moravia" } },
            { "Guadalupe", new Estacion { Nombre = "Guadalupe" } },
            { "Tibás", new Estacion { Nombre = "Tibás" } },
            { "Santo Domingo", new Estacion { Nombre = "Santo Domingo" } },
            { "Heredia", new Estacion { Nombre = "Heredia" } },
            { "San Pedro", new Estacion { Nombre = "San Pedro" } },
            { "San José", new Estacion { Nombre = "San José" } },
            { "Zapote", new Estacion { Nombre = "Zapote" } },
            { "Sabanilla", new Estacion { Nombre = "Sabanilla" } },
            { "Curridabat", new Estacion { Nombre = "Curridabat" } },
            { "Tres Ríos", new Estacion { Nombre = "Tres Ríos" } },
            { "Cartago", new Estacion { Nombre = "Cartago" } },
            { "Paraíso", new Estacion { Nombre = "Paraíso" } }
        };

        grafo["Moravia"].Conexiones.Add(new Conexion { EstacionDestino = "Guadalupe", Distancia = 3 });
        grafo["Guadalupe"].Conexiones.Add(new Conexion { EstacionDestino = "Moravia", Distancia = 3 });
        grafo["Guadalupe"].Conexiones.Add(new Conexion { EstacionDestino = "Tibás", Distancia = 2 });
        grafo["Guadalupe"].Conexiones.Add(new Conexion { EstacionDestino = "San Pedro", Distancia = 4 });
        grafo["Tibás"].Conexiones.Add(new Conexion { EstacionDestino = "Guadalupe", Distancia = 2 });
        grafo["Tibás"].Conexiones.Add(new Conexion { EstacionDestino = "Santo Domingo", Distancia = 5 });
        grafo["Santo Domingo"].Conexiones.Add(new Conexion { EstacionDestino = "Tibás", Distancia = 5 });
        grafo["Santo Domingo"].Conexiones.Add(new Conexion { EstacionDestino = "Heredia", Distancia = 3 });
        grafo["Heredia"].Conexiones.Add(new Conexion { EstacionDestino = "Santo Domingo", Distancia = 3 });
        grafo["Heredia"].Conexiones.Add(new Conexion { EstacionDestino = "San José", Distancia = 7 });
        grafo["San Pedro"].Conexiones.Add(new Conexion { EstacionDestino = "Guadalupe", Distancia = 4 });
        grafo["San Pedro"].Conexiones.Add(new Conexion { EstacionDestino = "Sabanilla", Distancia = 2 });
        grafo["San José"].Conexiones.Add(new Conexion { EstacionDestino = "Heredia", Distancia = 7 });
        grafo["San José"].Conexiones.Add(new Conexion { EstacionDestino = "Zapote", Distancia = 3 });
        grafo["Zapote"].Conexiones.Add(new Conexion { EstacionDestino = "San José", Distancia = 3 });
        grafo["Zapote"].Conexiones.Add(new Conexion { EstacionDestino = "Curridabat", Distancia = 2 });
        grafo["Sabanilla"].Conexiones.Add(new Conexion { EstacionDestino = "San Pedro", Distancia = 2 });
        grafo["Sabanilla"].Conexiones.Add(new Conexion { EstacionDestino = "Curridabat", Distancia = 4 });
        grafo["Curridabat"].Conexiones.Add(new Conexion { EstacionDestino = "Zapote", Distancia = 2 });
        grafo["Curridabat"].Conexiones.Add(new Conexion { EstacionDestino = "Sabanilla", Distancia = 4 });
        grafo["Curridabat"].Conexiones.Add(new Conexion { EstacionDestino = "Tres Ríos", Distancia = 8 });
        grafo["Tres Ríos"].Conexiones.Add(new Conexion { EstacionDestino = "Curridabat", Distancia = 8 });
        grafo["Tres Ríos"].Conexiones.Add(new Conexion { EstacionDestino = "Cartago", Distancia = 12 });
        grafo["Cartago"].Conexiones.Add(new Conexion { EstacionDestino = "Tres Ríos", Distancia = 12 });
        grafo["Cartago"].Conexiones.Add(new Conexion { EstacionDestino = "Paraíso", Distancia = 6 });
        grafo["Paraíso"].Conexiones.Add(new Conexion { EstacionDestino = "Cartago", Distancia = 6 });

        return grafo;
    }
}
