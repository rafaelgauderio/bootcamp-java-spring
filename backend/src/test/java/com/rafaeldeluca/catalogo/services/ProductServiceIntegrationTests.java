package com.rafaeldeluca.catalogo.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rafaeldeluca.catalogo.repositories.ProductRepository;
import com.rafaeldeluca.catalogo.services.exceptions.ResourceNotFoundException;

//carregar o contenxto da aplicação
@SpringBootTest
public class ProductServiceIntegrationTests {
	
	@Autowired
	private ProductService service;
	
	@Autowired
	private ProductRepository repository;
	
	private Long existId;
	private Long nonExistId;
	private Long countTotalProducts;
	
	@BeforeEach
	void setUp ( ) throws Exception {
		existId =2L;
		nonExistId = 50L; //vai até o 25L
		countTotalProducts = 25L;		
	}
	
	@Test
	public void deleteShouldDelteResourceWhenIdExists () {
		
		service.delete(existId);
		
		//método count retorna a quantidade total de registro no database
		Assertions.assertEquals(24, repository.count());
		Assertions.assertEquals(countTotalProducts - 1, repository.count());
		Assertions.assertTrue(countTotalProducts - 1 == repository.count() );
	}
	
	@Test
	public void deteleShouldThrowResourceNotFoundExceptionWhenIdDoesntExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistId);
		});
	}
	
	
}
