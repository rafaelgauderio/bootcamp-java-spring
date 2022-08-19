package com.rafaeldeluca.catalogo.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.rafaeldeluca.catalogo.entities.Product;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository repository;
	
	private Long existId;
	private Long nonExistId;
	
	@BeforeEach
	void setUp() throws Exception {
		this.existId = 2L;
		this.nonExistId = 50L;
	}
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {	
		
		repository.deleteById(2L);
		
		//optinal tem que retornar vazio se o produto de id correspondente foi deletado
		Optional<Product> optional = repository.findById(existId);
		Assertions.assertFalse(optional.isPresent());
		
	}
	
	@Test
	public void deleteShouldThrowExceptionWhenIdDoesNotExists () {	
		
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistId);
		});
		
	}	

}
