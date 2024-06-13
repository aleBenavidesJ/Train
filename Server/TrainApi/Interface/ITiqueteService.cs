using System.Collections.Generic;

public interface ITiqueteService
{
    void ComprarTiquete(Tiquete tiquete);
    IEnumerable<Tiquete> GetTiquetes();
}
