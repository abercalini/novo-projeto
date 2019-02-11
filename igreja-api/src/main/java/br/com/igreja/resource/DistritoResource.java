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

import br.com.igreja.model.Distrito;
import br.com.igreja.repository.DistritoRepository;

@RestController
@RequestMapping("/distritos")
public class DistritoResource {
	
	@Autowired
	private DistritoRepository distritoRepository;
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<Distrito> salvar(@RequestBody Distrito distrito) {
		Distrito distritoSalvo = distritoRepository.save(distrito);
		return ResponseEntity.status(HttpStatus.CREATED).body(distritoSalvo);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public List<Distrito> listarTodos() {
		return distritoRepository.findAll();
	}
	
	@DeleteMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable Long codigo) {
		distritoRepository.delete(codigo);
	}
	
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public ResponseEntity<Distrito> buscarPorCodigo(@PathVariable Long codigo) {
		Distrito distritoRetornado = distritoRepository.findOne(codigo);
		
		return distritoRetornado == null ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : ResponseEntity.status(HttpStatus.OK).body(distritoRetornado); 
	}
	
	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EDITAR_OBJETO')")
	public ResponseEntity<Distrito> atualizar(@PathVariable Long codigo, @RequestBody Distrito distrito) {
		Distrito distritoRetornado = distritoRepository.findOne(codigo);
		BeanUtils.copyProperties(distrito, distritoRetornado, "codigo");
		distritoRepository.save(distritoRetornado);
		
		return ResponseEntity.status(HttpStatus.OK).body(distritoRetornado);
	}
	
	
	
	
}
