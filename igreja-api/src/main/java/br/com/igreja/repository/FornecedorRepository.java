package br.com.igreja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igreja.filters.FornecedorRepositoryQuery;
import br.com.igreja.model.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long>, FornecedorRepositoryQuery{
	
	
}
