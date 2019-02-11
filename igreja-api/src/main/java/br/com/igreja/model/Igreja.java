package br.com.igreja.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "igreja")
@SuppressWarnings("serial")
public class Igreja implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;
	
	private String nome;
	private String cnpj;
	private String telefone;
	private String responsavel;
	
	@ManyToOne
	@JoinColumn(name = "distrito_codigo")
	private Distrito distrito;
	
	@Column(name = "tipo_igreja")
	private String tipoIgreja;
	
	@Column(name = "porcentagem_contribuicao")
	private String porcentagemContribuicao;
	
	private String email;
	
	@Embedded
	private Endereco endereco;
	
	public Long getCodigo() {
		return codigo;
	}
	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCnpj() {
		return cnpj;
	}
	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getResponsavel() {
		return responsavel;
	}
	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}
	public Distrito getDistrito() {
		return distrito;
	}
	public void setDistrito(Distrito distrito) {
		this.distrito = distrito;
	}
	public String getTipoIgreja() {
		return tipoIgreja;
	}
	public void setTipoIgreja(String tipoIgreja) {
		this.tipoIgreja = tipoIgreja;
	}
	public String getPorcentagemContribuicao() {
		return porcentagemContribuicao;
	}
	public void setPorcentagemContribuicao(String porcentagemContribuicao) {
		this.porcentagemContribuicao = porcentagemContribuicao;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
	public Endereco getEndereco() {
		return endereco;
	}
	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Igreja other = (Igreja) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}
}
