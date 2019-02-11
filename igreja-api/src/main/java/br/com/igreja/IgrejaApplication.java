package br.com.igreja;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import br.com.igreja.config.property.IgrejaApiProperty;

@SpringBootApplication
@EnableConfigurationProperties(IgrejaApiProperty.class)
public class IgrejaApplication {

	public static void main(String[] args) {
		SpringApplication.run(IgrejaApplication.class, args);
	}

}

