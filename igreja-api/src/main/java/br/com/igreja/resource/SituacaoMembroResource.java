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

import br.com.igreja.model.SituacaoMembro;
import br.com.igreja.repository.SituacaoRespository;

@RestController
@RequestMapping("/situacaomembro")
public class SituacaoMembroResource {
	
	@Autowired
	private SituacaoRespository situacaoRepository;
	
	@PostMapping 
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<SituacaoMembro> salvar(@RequestBody SituacaoMembro situacaoMembro) {
		SituacaoMembro situacaoMembroSalvo = situacaoRepository.save(situacaoMembro);
		return ResponseEntity.status(HttpStatus.CREATED).body(situacaoMembroSalvo);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public List<SituacaoMembro> listarTodos() {
		return situacaoRepository.findAll();
	}
	
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public ResponseEntity<SituacaoMembro> buscarPorCodigo(@PathVariable Long codigo) {
		SituacaoMembro situacaoRetornada = situacaoRepository.findOne(codigo);
		return situacaoRetornada != null ? ResponseEntity.status(HttpStatus.OK).body(situacaoRetornada) : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EDITAR_OBJETO')")
	public ResponseEntity<SituacaoMembro> editar(@PathVariable Long codigo, @RequestBody SituacaoMembro situacaoMembro) {
		SituacaoMembro situacaoMembroRetornada = situacaoRepository.findOne(codigo);
		BeanUtils.copyProperties(situacaoMembro, situacaoMembroRetornada, "codigo");
		situacaoRepository.save(situacaoMembroRetornada);
		
		return ResponseEntity.status(HttpStatus.OK).body(situacaoMembroRetornada);
	}
	
	@DeleteMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EDITAR_OBJETO')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Long codigo) {
		situacaoRepository.delete(codigo);
	}
}
