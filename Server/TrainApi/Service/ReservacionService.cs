using System.Collections.Generic;

public class ReservacionService : IReservacionService
{
    private readonly List<Reservacion> _reservaciones = new();

    public IEnumerable<Reservacion> GetReservaciones()
    {
        return _reservaciones;
    }

    // Other methods as needed
}