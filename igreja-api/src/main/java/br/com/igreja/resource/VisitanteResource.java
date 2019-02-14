package br.com.igreja.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.model.Visitante;
import br.com.igreja.repository.VisitanteRepository;

@RestController
@RequestMapping("/visitantes")
public class VisitanteResource {
	
	@Autowired
	private VisitanteRepository visitanteRepository;
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<Visitante> salvar(@RequestBody Visitante visitante) {
		Visitante visitanteSalvo = visitanteRepository.save(visitante);
		return ResponseEntity.status(HttpStatus.CREATED).body(visitanteSalvo);
	}
	
	
	
}
