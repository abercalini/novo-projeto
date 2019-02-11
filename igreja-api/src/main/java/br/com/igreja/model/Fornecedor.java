package br.com.igreja.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "fornecedor")
@Entity
@SuppressWarnings("serial")
public class Fornecedor implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;
	
	private String nome;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "tipo_pessoa")
	private TipoPessoa tipoPessoa;
	
	private String cnpj;
	private String cpf;
	
	private boolean colaborador;
	private String rg;
	private String cargo;
	private BigDecimal inss;
	
	@Column(name = "valor_renda")
	private BigDecimal valorRenda;
	
	@Column(name = "data_admissao")
	private LocalDate dataAdmissao;
	
	@Column(name = "data_desligamento")
	private LocalDate dataDesligamento;
	
	private String email;
	private String telefone;
	private String celular;
	
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

	public TipoPessoa getTipoPessoa() {
		return tipoPessoa;
	}

	public void setTipoPessoa(TipoPessoa tipoPessoa) {
		this.tipoPessoa = tipoPessoa;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	

	public boolean isColaborador() {
		return colaborador;
	}

	public void setColaborador(boolean colaborador) {
		this.colaborador = colaborador;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	

	public BigDecimal getInss() {
		return inss;
	}

	public void setInss(BigDecimal inss) {
		this.inss = inss;
	}

	public BigDecimal getValorRenda() {
		return valorRenda;
	}

	public void setValorRenda(BigDecimal valorRenda) {
		this.valorRenda = valorRenda;
	}

	public LocalDate getDataAdmissao() {
		return dataAdmissao;
	}

	public void setDataAdmissao(LocalDate dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}

	public LocalDate getDataDesligamento() {
		return dataDesligamento;
	}

	public void setDataDesligamento(LocalDate dataDesligamento) {
		this.dataDesligamento = dataDesligamento;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
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
		Fornecedor other = (Fornecedor) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}
	
}
