using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class ReservacionController : ControllerBase
{
    private readonly IReservacionService _reservacionService;

    public ReservacionController(IReservacionService reservacionService)
    {
        _reservacionService = reservacionService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Reservacion>> GetReservaciones()
    {
        return Ok(_reservacionService.GetReservaciones());
    }
}
