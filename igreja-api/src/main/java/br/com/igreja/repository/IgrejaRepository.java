package br.com.igreja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igreja.filters.IgrejaRepositoryQuery;
import br.com.igreja.model.Igreja;

public interface IgrejaRepository extends JpaRepository<Igreja, Long>, IgrejaRepositoryQuery{

}
