package br.com.igreja.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.filter.HistoricoFilter;
import br.com.igreja.model.Historico;
import br.com.igreja.repository.HistoricoRepository;

@RestController
@RequestMapping("/historico")
public class HistoricoResource {
	
	@Autowired
	private HistoricoRepository historicoRepository;
	
	@PostMapping
	public ResponseEntity<Historico> salvar(@RequestBody Historico historico) {
		Historico historicoSalvo = historicoRepository.save(historico);
		return ResponseEntity.status(HttpStatus.CREATED).body(historicoSalvo);
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Historico> listarTodos(HistoricoFilter historicoFilter) {
		return historicoRepository.buscarPorHistorico(historicoFilter);
	}
}
