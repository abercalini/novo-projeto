package br.com.igreja.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Table(name = "membro")
@Entity
public class Membro implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;
	
	private String nome;
	private boolean situacao;
	private String tipo;
	private String sexo;
	
	@Column(name = "data_nascimento")
	private LocalDate dataNascimento;
	
	@Column(name = "estado_civil")
	private String estadoCivil;
	
	private String cpf;
	private String rg;
	private String nacionalidade;
	private String profissao;
	private String naturalidade;
	private String email;
	private String telefone;
	private String celular;
	
	@Column(name = "gra_escolaridade")
	private String graEscolaridade;
	
	private String curso;
	
	@Embedded
	private Endereco endereco;
	
	@Column(name = "nome_pai")
	private String nomePai;
	
	@Column(name = "nome_mae")
	private String nomeMae;
	
	@Column(name = "data_consagracao")
	private LocalDate dataConsagracao;
	
	@Column(name = "data_batismo")
	private LocalDate dataBatismo;
	
	@Column(name = "como_se_converteu")
	private String comoSeConverteu;
	
	@Column(name = "igreja_procedencia")
	private String igrejaProcedencia;
	
	@Column(name = "bastimo_espirito_santo")
	private String bastimoEspiritoSanto;
	
	private String dizimista;
	
	private String observacao;
	
	@ManyToOne
	@JoinColumn(name = "codigo_tipo_adesao")
	private TipoAdesao tipoAdesao; 
	
	@ManyToOne
	@JoinColumn(name = "codigo_situacao_membro")
	private SituacaoMembro situacaoMembro;
	
	@ManyToOne
	@JoinColumn(name = "codigo_cargo_ministro")
	private CargoMinitro cargoMinistro;
	
	
	@ManyToMany(fetch=FetchType.EAGER)
	@JoinTable(name = "membro_funcoes", joinColumns = @JoinColumn(name = "codigo_membro"),
		inverseJoinColumns = @JoinColumn(name = "codigo_funcao"))
	private List<FuncaoMembro> funcoes = new ArrayList<>();
	
	
	public Membro() {
		
	}

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

	public boolean isSituacao() {
		return situacao;
	}

	public void setSituacao(boolean situacao) {
		this.situacao = situacao;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public String getProfissao() {
		return profissao;
	}

	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}

	public String getNaturalidade() {
		return naturalidade;
	}

	public void setNaturalidade(String naturalidade) {
		this.naturalidade = naturalidade;
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

	public String getGraEscolaridade() {
		return graEscolaridade;
	}

	public void setGraEscolaridade(String graEscolaridade) {
		this.graEscolaridade = graEscolaridade;
	}

	public String getCurso() {
		return curso;
	}

	public void setCurso(String curso) {
		this.curso = curso;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public String getNomePai() {
		return nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public SituacaoMembro getSituacaoMembro() {
		return situacaoMembro;
	}

	public void setSituacaoMembro(SituacaoMembro situacaoMembro) {
		this.situacaoMembro = situacaoMembro;
	}

	public LocalDate getDataConsagracao() {
		return dataConsagracao;
	}

	public void setDataConsagracao(LocalDate dataConsagracao) {
		this.dataConsagracao = dataConsagracao;
	}

	public LocalDate getDataBatismo() {
		return dataBatismo;
	}

	public void setDataBatismo(LocalDate dataBatismo) {
		this.dataBatismo = dataBatismo;
	}

	public String getComoSeConverteu() {
		return comoSeConverteu;
	}

	public void setComoSeConverteu(String comoSeConverteu) {
		this.comoSeConverteu = comoSeConverteu;
	}

	public String getIgrejaProcedencia() {
		return igrejaProcedencia;
	}

	public void setIgrejaProcedencia(String igrejaProcedencia) {
		this.igrejaProcedencia = igrejaProcedencia;
	}

	public String getBastimoEspiritoSanto() {
		return bastimoEspiritoSanto;
	}

	public void setBastimoEspiritoSanto(String bastimoEspiritoSanto) {
		this.bastimoEspiritoSanto = bastimoEspiritoSanto;
	}

	public String getDizimista() {
		return dizimista;
	}

	public void setDizimista(String dizimista) {
		this.dizimista = dizimista;
	}

	
	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	

	public TipoAdesao getTipoAdesao() {
		return tipoAdesao;
	}

	public void setTipoAdesao(TipoAdesao tipoAdesao) {
		this.tipoAdesao = tipoAdesao;
	}

	public CargoMinitro getCargoMinistro() {
		return cargoMinistro;
	}

	public void setCargoMinistro(CargoMinitro cargoMinistro) {
		this.cargoMinistro = cargoMinistro;
	}
	
	
	

	public List<FuncaoMembro> getFuncoes() {
		return funcoes;
	}

	public void setFuncoes(List<FuncaoMembro> funcoes) {
		this.funcoes = funcoes;
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
		Membro other = (Membro) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Membro [codigo=" + codigo + ", nome=" + nome + ", situacao=" + situacao + ", tipo=" + tipo + ", sexo="
				+ sexo + ", dataNascimento=" + dataNascimento + ", estadoCivil=" + estadoCivil + ", cpf=" + cpf
				+ ", rg=" + rg + ", nacionalidade=" + nacionalidade + ", profissao=" + profissao + ", naturalidade="
				+ naturalidade + ", email=" + email + ", telefone=" + telefone + ", celular=" + celular
				+ ", graEscolaridade=" + graEscolaridade + ", curso=" + curso + ", endereco=" + endereco + ", nomePai="
				+ nomePai + ", nomeMae=" + nomeMae + ", dataConsagracao=" + dataConsagracao + ", dataBatismo="
				+ dataBatismo + ", comoSeConverteu=" + comoSeConverteu + ", igrejaProcedencia=" + igrejaProcedencia
				+ ", bastimoEspiritoSanto=" + bastimoEspiritoSanto + ", dizimista=" + dizimista + ", observacao="
				+ observacao + ", tipoAdesao=" + tipoAdesao + ", situacaoMembro=" + situacaoMembro + ", cargoMinistro="
				+ cargoMinistro + ", funcoes=" + funcoes + "]";
	}
	
	
	
}
