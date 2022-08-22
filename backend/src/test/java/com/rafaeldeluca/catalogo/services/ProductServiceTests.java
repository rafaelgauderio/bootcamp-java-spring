package com.rafaeldeluca.catalogo.services;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.rafaeldeluca.catalogo.repositories.ProductRepository;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	
	//testes de unidade
	// testar a classe espefífica sem carregar o outro componente de qual ela depende
	// Preciso mocar as dependências para fazer os testes de unidade
	// Se carregar outros componentes, não será um teste de unidade, será um teste de integração.
	// service não vai ter acesso ao banco de dados real para fazer os testes
	// Ao criar um Mock é necessário configurar o comportamento simulado desse mock
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	
	@BeforeEach
	void setUp() throws Exception {
		//id que existe no projeto vai do 1L até o 25L
		this.existingId = 2L;
		this.nonExistingId = 50L;
		
		
		//comportamento simulado para não fazer nada quando chamar um médoto deleteByid
		Mockito.doNothing().when(repository).deleteById(existingId);
		doNothing().when(repository).deleteById(existingId);
		//comportamento para um Id que não existe
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		/* a camada de serviço apenas vai chamar o método deleteByiD da camada de repository.
		* e a camada de repository que vai comunicar com o banco e deletar, mas camada de serviço não ve isso.
		* service.delete(ExistingId);
		* Não deve disparar exceção de informar um Id que existe */	
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
		verify(repository,times(1)).deleteById(existingId);
	}

}
