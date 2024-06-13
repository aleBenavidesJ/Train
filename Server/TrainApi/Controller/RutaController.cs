using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class RutaController : ControllerBase
{
    private readonly IRutaService _rutaService;

    public RutaController(IRutaService rutaService)
    {
        _rutaService = rutaService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Ruta>> GetRutas()
    {
        return Ok(_rutaService.GetRutas());
    }

    [HttpPost]
    public ActionResult AddRuta([FromBody] Ruta ruta)
    {
        _rutaService.AddRuta(ruta);
        return Ok();
    }

    [HttpPut("{id}")]
    public ActionResult UpdateRuta(int id, [FromBody] Ruta ruta)
    {
        _rutaService.UpdateRuta(id, ruta);
        return Ok();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteRuta(int id)
    {
        _rutaService.DeleteRuta(id);
        return Ok();
    }
}
