package br.com.igreja.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.model.Membro;
import br.com.igreja.repository.MembroRespository;

@RestController
@RequestMapping("/membro")
public class MembroResource {
	
	@Autowired
	private MembroRespository membroRespository;
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<Membro> salvar(@RequestBody Membro membro) {
		Membro membroSalvo = membroRespository.save(membro);
		return ResponseEntity.status(HttpStatus.CREATED).body(membroSalvo);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public List<Membro> listarTodos() {
		return membroRespository.findAll();
	}
	
	
}
