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

import br.com.igreja.model.FuncaoMembro;
import br.com.igreja.repository.FuncaoMembroRepository;

@RestController
@RequestMapping("/funcaomembro")
public class FuncaoMembroResource {
	
	@Autowired
	private FuncaoMembroRepository funcaoMembroRepository;
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<FuncaoMembro> salvar(@RequestBody FuncaoMembro funcaoMembro) {
		FuncaoMembro funcaoMembroSalvo = funcaoMembroRepository.save(funcaoMembro);
		return ResponseEntity.status(HttpStatus.CREATED).body(funcaoMembroSalvo);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public List<FuncaoMembro> listarTodos() {
		return funcaoMembroRepository.findAll();
	}
	
	@DeleteMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EXCLUIR_OBJETO')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable Long codigo) {
		funcaoMembroRepository.delete(codigo);
	}
	
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public ResponseEntity<FuncaoMembro> buscarPorCodigo(@PathVariable Long codigo) {
		FuncaoMembro funcaoMembroRetornado = funcaoMembroRepository.findOne(codigo);
		return funcaoMembroRetornado != null? ResponseEntity.status(HttpStatus.OK).body(funcaoMembroRetornado) : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EDITAR_OBJETO')")
	public ResponseEntity<FuncaoMembro> editar(@PathVariable Long codigo, @RequestBody FuncaoMembro funcaoMembro) {
		FuncaoMembro funcaoMembroRetornado = funcaoMembroRepository.findOne(codigo);
		BeanUtils.copyProperties(funcaoMembro, funcaoMembroRetornado, "codigo");
		funcaoMembroRepository.save(funcaoMembroRetornado);
		return ResponseEntity.status(HttpStatus.OK).body(funcaoMembroRetornado);
	}
	
}
