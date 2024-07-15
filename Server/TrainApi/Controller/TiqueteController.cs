using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class TiqueteController : ControllerBase
{
    private readonly ITiqueteService _tiqueteService;

    public TiqueteController(ITiqueteService tiqueteService)
    {
        _tiqueteService = tiqueteService;
    }

    [HttpPost]
    public ActionResult ComprarTiquete([FromBody] Tiquete tiquete)
    {
        _tiqueteService.ComprarTiquete(tiquete);
        return Ok();
    }

    [HttpGet]
    public ActionResult<IEnumerable<Tiquete>> GetTiquetes()
    {
        return Ok(_tiqueteService.GetTiquetes());
    }
}
