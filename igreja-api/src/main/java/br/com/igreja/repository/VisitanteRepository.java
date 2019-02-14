package br.com.igreja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igreja.filters.VisitanteRepositoryQuery;
import br.com.igreja.model.Visitante;

public interface VisitanteRepository extends JpaRepository<Visitante, Long>, VisitanteRepositoryQuery{

}
