package br.com.igreja.filters;

import java.util.List;

import br.com.igreja.filter.IgrejaFilter;
import br.com.igreja.model.Igreja;

public interface IgrejaRepositoryQuery {
	
	public List<Igreja> buscarPorNome(IgrejaFilter igrejaFilter);
}
