using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class RutaController : ControllerBase
{
    private readonly IRutaService _rutaService;
    private readonly IDijkstraService _dijkstraService;

    public RutaController(IRutaService rutaService, IDijkstraService dijkstraService)
    {
        _rutaService = rutaService;
        _dijkstraService = dijkstraService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Ruta>> GetRutas()
    {
        var rutas = _rutaService.GetRutas();
        return Ok(rutas);
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

    [HttpGet("CalcularRuta")]
    public ActionResult CalcularRuta([FromQuery] string inicio, [FromQuery] string fin)
    {
        var grafo = Graph.CrearGrafo();
        var resultado = _dijkstraService.CalcularRutaMasCorta(grafo, inicio, fin);

        return Ok(new { Ruta = resultado.Path, Distancia = resultado.Distance, Costo = resultado.Cost });
    }
}