package br.com.igreja.filters;

import java.util.List;

import br.com.igreja.filter.FornecedorFilter;
import br.com.igreja.model.Fornecedor;

public interface FornecedorRepositoryQuery {
	
	public List<Fornecedor> buscarPorNome(FornecedorFilter fornecedorFilter);
}
