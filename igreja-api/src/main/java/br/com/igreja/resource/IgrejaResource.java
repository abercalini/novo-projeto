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

import br.com.igreja.filter.IgrejaFilter;
import br.com.igreja.model.Igreja;
import br.com.igreja.repository.IgrejaRepository;

@RestController
@RequestMapping("/igreja")
public class IgrejaResource {
	
	@Autowired
	private IgrejaRepository igrejaRepository;
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<Igreja> salvar(@RequestBody Igreja igreja) {
		Igreja igrejaSalva = igrejaRepository.save(igreja);
		return ResponseEntity.status(HttpStatus.CREATED).body(igrejaSalva);
	}
	
	@DeleteMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EXCLUIR_OBJETO')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable Long codigo) {
		this.igrejaRepository.delete(codigo);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	@ResponseStatus(HttpStatus.OK)
	public List<Igreja> listarTodos(IgrejaFilter igrejaFilter) {
		return igrejaRepository.buscarPorNome(igrejaFilter);
	}
	
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public ResponseEntity<Igreja> buscarPorCodigo(@PathVariable Long codigo) {
		Igreja igrejaRetornada = igrejaRepository.findOne(codigo);
		return igrejaRetornada != null ? ResponseEntity.status(HttpStatus.OK).body(igrejaRetornada) : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EDITAR_OBJETO')")
	public ResponseEntity<Igreja> editar(@PathVariable Long codigo, @RequestBody Igreja igreja) {
		System.out.println("Editado");
		Igreja igrejaRetornada = igrejaRepository.findOne(codigo);
		BeanUtils.copyProperties(igreja, igrejaRetornada, "codigo");
		igrejaRepository.save(igrejaRetornada);
		
		return ResponseEntity.status(HttpStatus.OK).body(igrejaRetornada);
	}
	
	
}
