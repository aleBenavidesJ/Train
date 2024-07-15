using System;
using System.Collections.Generic;

public class Reservacion
{
    public int Id { get; set; }
    public string CedulaUsuario { get; set; }
    public DateTime FechaReservacion { get; set; }
    public List<Tiquete> Tiquetes { get; set; }
}
