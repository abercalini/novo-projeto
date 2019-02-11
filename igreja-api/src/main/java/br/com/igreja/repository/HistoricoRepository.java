package br.com.igreja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igreja.filters.HistoricoRepositoryQuery;
import br.com.igreja.model.Historico;

public interface HistoricoRepository extends JpaRepository<Historico, Long>, HistoricoRepositoryQuery{

}
