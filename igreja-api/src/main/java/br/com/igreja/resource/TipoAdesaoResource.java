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

import br.com.igreja.model.TipoAdesao;
import br.com.igreja.repository.TipoAdesaoRepository;

@RestController
@RequestMapping("/tipoadesao")
public class TipoAdesaoResource {
	
	@Autowired
	private TipoAdesaoRepository tipoAdesaoRepository;
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<TipoAdesao> salvar(@RequestBody TipoAdesao tipoAdesao) {
		TipoAdesao tipoAdesaosSalvo = tipoAdesaoRepository.save(tipoAdesao);
		return ResponseEntity.status(HttpStatus.CREATED).body(tipoAdesaosSalvo);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	@ResponseStatus(HttpStatus.OK)
	public List<TipoAdesao> listarTodos() {
		return tipoAdesaoRepository.findAll();
	}
	
	@DeleteMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EXCLUIR_OBJETO')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Long codigo) {
		tipoAdesaoRepository.delete(codigo);
	}
	
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public ResponseEntity<TipoAdesao> buscarPorCodigo(@PathVariable Long codigo) {
		TipoAdesao tipoAdesaoRetornado = tipoAdesaoRepository.findOne(codigo);
		return tipoAdesaoRetornado != null ? ResponseEntity.status(HttpStatus.OK).body(tipoAdesaoRetornado) : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EDITAR_OBJETO')")
	public ResponseEntity<TipoAdesao> editar(@PathVariable Long codigo, @RequestBody TipoAdesao tipoAdesao) {
		TipoAdesao tipoAdesaoRetornado = tipoAdesaoRepository.findOne(codigo);
		BeanUtils.copyProperties(tipoAdesao, tipoAdesaoRetornado, "codigo");
		tipoAdesaoRepository.save(tipoAdesaoRetornado);
		return ResponseEntity.status(HttpStatus.OK).body(tipoAdesaoRetornado);
	}
	
	
}
