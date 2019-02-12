package br.com.igreja.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.igreja.model.CargoMinitro;
import br.com.igreja.repository.CargoMinistroRepository;

@RestController
@RequestMapping("/cargoministro")
public class CargoMinistroResource {
	
	@Autowired
	private CargoMinistroRepository cargoMinistroRepository;
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_OBJETO')")
	public ResponseEntity<CargoMinitro> salvar(@RequestBody CargoMinitro cargoMinistro) {
		CargoMinitro cargoMinitroSalvo = cargoMinistroRepository.save(cargoMinistro);
		return ResponseEntity.status(HttpStatus.CREATED).body(cargoMinitroSalvo);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_OBJETO')")
	@ResponseStatus(HttpStatus.OK)
	public List<CargoMinitro> listar() {
		return cargoMinistroRepository.findAll();
	}
	
}
