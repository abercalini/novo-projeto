package br.com.igreja.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Table(name = "membro")
@Entity
public class Membro implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;
	
	private String nome;
	private String sobrenome;
	private Integer idade;
	private String cpf;
	private String rg;
	
	
	
	@Enumerated(EnumType.STRING)
	private TipoPessoa tipoPessoa;
}
