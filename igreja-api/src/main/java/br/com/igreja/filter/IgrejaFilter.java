package br.com.igreja.filter;

import br.com.igreja.model.Distrito;

public class IgrejaFilter {
	
	private String nome;
	private String nomeDistrito;
	
	private Distrito distrito = new Distrito();

	
	public String getNome() {
		return nome;
	}
	

	public String getNomeDistrito() {
		return nomeDistrito;
	}


	public void setNomeDistrito(String nomeDistrito) {
		this.nomeDistrito = nomeDistrito;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}

	public Distrito getDistrito() {
		return distrito;
	}

	public void setDistrito(Distrito distrito) {
		this.distrito = distrito;
	}
	
	
	
	
}


