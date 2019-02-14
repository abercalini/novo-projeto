CREATE TABLE visitante (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	telefone VARCHAR(50),
	email VARCHAR(50),
	rua VARCHAR(50),
	numero VARCHAR(20),
	bairro VARCHAR(50),
	estado VARCHAR(15),
	cidade VARCHAR(50),
	cep VARCHAR(20),
	observacao VARCHAR(100),
	cargo_ministro_codigo BIGINT(20),
	FOREIGN KEY(cargo_ministro_codigo) REFERENCES cargo_ministro(codigo)
)ENGINE=Innodb DEFAULT CHARSET=utf8;
