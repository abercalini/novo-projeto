package br.com.igreja.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.igreja.model.Usuario;
import br.com.igreja.repository.UsuarioRepository;

@Service
public class AppUserDetailService implements UserDetailsService {
	
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
		Usuario usuario = usuarioOptional.orElseThrow(() -> new UsernameNotFoundException("Usúario não encontrado"));
		
		
		return new User(email, usuario.getSenha(), getPermissoes(usuario));
	}

	
	private Collection<? extends GrantedAuthority> getPermissoes(Usuario usuario) {
		
		Set<SimpleGrantedAuthority> authority = new HashSet<>();
		usuario.getPermissoes().forEach(p -> authority.add(new SimpleGrantedAuthority(p.getDescricao().toUpperCase())));
		
		return authority;
	}

}
