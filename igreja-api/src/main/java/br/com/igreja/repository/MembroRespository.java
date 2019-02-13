package br.com.igreja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igreja.model.Membro;

public interface MembroRespository extends JpaRepository<Membro, Long>{

}
