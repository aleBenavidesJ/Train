using System.Collections.Generic;
public class Estacion
{
    public string Nombre { get; set; }
    public List<Conexion> Conexiones { get; set; } = new List<Conexion>();
}