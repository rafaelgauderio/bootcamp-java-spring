package com.rafaeldeluca.catalogo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class AppConfig {
	
	@Bean
	public BCryptPasswordEncoder encoderPasswprd () {
		BCryptPasswordEncoder encryptedPassword = new BCryptPasswordEncoder();
		return encryptedPassword;
	}

}
