package br.com.igreja.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.model.FuncaoMembro;
import br.com.igreja.model.Membro;
import br.com.igreja.repository.MembroRespository;

@RestController
@RequestMapping("/membro")
public class MembroResource {
	
	@Autowired
	private MembroRespository membroRespository;
	
/*	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<Membro> salvar(@RequestBody Membro membro) {
		
		System.out.println("Aqui" + membro);
		
		Membro membroSalvo = membroRespository.save(membro);
		return ResponseEntity.status(HttpStatus.CREATED).body(membroSalvo);
	} */
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public void salvar(@RequestBody Membro membro) {
		
		System.out.println(membro);
		
		System.out.println("debug" + membro.getTipoAdesao().getCodigo());
		System.out.println("degub" + membro.getSituacaoMembro().getCodigo());
		System.out.println("degub" + membro.getCargoMinistro().getCodigo());
		
		System.out.println("funçoes"  + membro.getFuncoes());
		
		List<FuncaoMembro> funcoes = membro.getFuncoes();
		
		for (FuncaoMembro funcaoMembro : funcoes) {
			System.out.println("debug : " + funcaoMembro.getCodigo());
		}
	
	}
	
	
	
}
