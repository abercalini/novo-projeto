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

import br.com.igreja.filter.FornecedorFilter;
import br.com.igreja.model.Fornecedor;
import br.com.igreja.repository.FornecedorRepository;

@RestController
@RequestMapping("/fornecedor")
public class FornecedorResoruce {
	
	@Autowired
	private FornecedorRepository fornecedorRepository;
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<Fornecedor> salvar(@RequestBody Fornecedor fornecedor) {
		Fornecedor fornecedorSalvo = fornecedorRepository.save(fornecedor);
		return ResponseEntity.status(HttpStatus.CREATED).body(fornecedorSalvo);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	@ResponseStatus(HttpStatus.OK)
	public List<Fornecedor> listar(FornecedorFilter fornecedorFilter) {
		return fornecedorRepository.buscarPorNome(fornecedorFilter);
	}
	
	@DeleteMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EXCLUIR_OBJETO')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable Long codigo) {
		fornecedorRepository.delete(codigo);
	}
	
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public ResponseEntity<Fornecedor> buscarPorCodigo(@PathVariable Long codigo) {
		Fornecedor fornecedorRetornado = fornecedorRepository.findOne(codigo);
		return fornecedorRetornado != null ? ResponseEntity.status(HttpStatus.OK).body(fornecedorRetornado) : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_EDITAR_OBJETO')")
	public ResponseEntity<Fornecedor> atualizar(@PathVariable Long codigo, @RequestBody Fornecedor fornecedor) {
		Fornecedor fornecedorRetornado = fornecedorRepository.findOne(codigo);
		BeanUtils.copyProperties(fornecedor, fornecedorRetornado, "codigo");
		fornecedorRepository.save(fornecedorRetornado);
		return ResponseEntity.status(HttpStatus.OK).body(fornecedorRetornado);
	}
	
	/*@GetMapping("/grafico")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	public List<Fornecedor> lista() {
		List<Fornecedor> fornecedores = fornecedorRepository.findAll();
		for(Fornecedor f : fornecedores) {
			System.out.println(f.isColaborador());
		}
		return fornecedores;
	} */
}
