using System.Collections.Generic;

public class TiqueteService : ITiqueteService
{
    private readonly List<Tiquete> _tiquetes = new();

    public void ComprarTiquete(Tiquete tiquete)
    {
        _tiquetes.Add(tiquete);
    }

    public IEnumerable<Tiquete> GetTiquetes()
    {
        return _tiquetes;
    }
}
