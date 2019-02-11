package br.com.igreja.filters;

import java.util.List;

import br.com.igreja.filter.HistoricoFilter;
import br.com.igreja.model.Historico;

public interface HistoricoRepositoryQuery {
	
	public List<Historico> buscarPorHistorico(HistoricoFilter historicoFilter);
}
