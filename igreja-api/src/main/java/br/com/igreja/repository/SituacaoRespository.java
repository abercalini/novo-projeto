package br.com.igreja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igreja.model.SituacaoMembro;

public interface SituacaoRespository extends JpaRepository<SituacaoMembro, Long>{

}
