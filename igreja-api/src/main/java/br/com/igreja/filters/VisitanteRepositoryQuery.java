package br.com.igreja.filters;

import java.util.List;

import br.com.igreja.filter.VisitanteFilter;
import br.com.igreja.model.Visitante;

public interface VisitanteRepositoryQuery {
	
	public List<Visitante> filtrarPorNome(VisitanteFilter visitanteFilter);
}
