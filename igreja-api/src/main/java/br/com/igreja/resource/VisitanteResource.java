package br.com.igreja.resource;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.filter.VisitanteFilter;
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
		if(visitante.getCargoMinistro().getCodigo() == null) {
			visitante.getCargoMinistro().setCodigo(1L);
		}
		Visitante visitanteSalvo = visitanteRepository.save(visitante);
		return ResponseEntity.status(HttpStatus.CREATED).body(visitanteSalvo);
	}
	
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public List<Visitante> listarTodos(VisitanteFilter visitanteFilter) {
		return visitanteRepository.filtrarPorNome(visitanteFilter);
	}
	
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public ResponseEntity<Visitante> buscarPorCodigo(@PathVariable Long codigo) {
		Visitante visitanteRetornado = visitanteRepository.findOne(codigo);
		return visitanteRetornado != null ? ResponseEntity.status(HttpStatus.OK).body(visitanteRetornado) : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@DeleteMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EXCLUIR_OBJETO')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable Long codigo) {
		visitanteRepository.delete(codigo);
	}
	
	
	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EDITAR_OBJETO')")
	public ResponseEntity<Visitante> editar(@PathVariable Long codigo, @RequestBody Visitante visitante) {
		Visitante visitanteRetornado = visitanteRepository.findOne(codigo);
		BeanUtils.copyProperties(visitante, visitanteRetornado, "codigo");
		visitanteRepository.save(visitanteRetornado);
		return ResponseEntity.status(HttpStatus.OK).body(visitanteRetornado);
	}
	
}
