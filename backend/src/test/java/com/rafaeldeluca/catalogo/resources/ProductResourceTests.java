package com.rafaeldeluca.catalogo.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rafaeldeluca.catalogo.dto.ProductDTO;
import com.rafaeldeluca.catalogo.services.ProductService;
import com.rafaeldeluca.catalogo.services.exceptions.DataBaseException;
import com.rafaeldeluca.catalogo.services.exceptions.ResourceNotFoundException;
import com.rafaeldeluca.catalogo.tests.Factory;

//No Productresource (controller) tem que simular os comportamentos do ProductService

@WebMvcTest(ProductResource.class)
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private ProductDTO productDTO;
	private PageImpl<ProductDTO> pageImpl; //criando um objeto de pagina completo com PageImpl
	private Long existId;
	private Long nonExistId;
	private Long dbIntegrityId;
	
	//simular o comportamento do service (findAllPage)
	@BeforeEach
	void setUp() throws Exception {
		
		existId = 1L;
		nonExistId = 50L;
		dbIntegrityId = 2L;
		
		productDTO = Factory.createProductDTO();
		pageImpl = new PageImpl<>(List.of(productDTO));
		
		when(service.findAllPaged(any())).thenReturn(pageImpl);
		
		when(service.findById(existId)).thenReturn(productDTO);
		when(service.findById(nonExistId)).thenThrow(ResourceNotFoundException.class);
		
		//simulando o comportamento do update
		when(service.update(eq(existId), any())).thenReturn(productDTO);
		when(service.update(eq(nonExistId), any())).thenThrow(ResourceNotFoundException.class);
		
		//simpulando comportamento para o método delete (void)
		doNothing().when(service).delete(existId);
		doThrow(ResourceNotFoundException.class).when(service).delete(nonExistId);
		doThrow(DataBaseException.class).when(service).delete(dbIntegrityId);		
	}
	
	@Test
	public void findAllShouldReturnPage() throws Exception {		
		//perfom faz um requisição no metodo http get e esperar que a resposta seja ok
		try {
			ResultActions result = 
					mockMvc.perform(get("/products")
							.accept(MediaType.APPLICATION_JSON));
			//assertions apartir do resultado				
			result.andExpect(status().isOk());
			
		} catch (Exception e) {			
			e.printStackTrace();
		}
		
	}
	
	@Test
	public void findByIdShouldReturnProductWhenIdExists() throws Exception {
		
		ResultActions result = mockMvc.perform(get("/products/{id}",existId)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());				
		
	}
	
	@Test
	public void findByIdShouldReturnNotFoundWheIdNotExists() throws Exception {
		ResultActions result = mockMvc.perform(get("/products/{id}",nonExistId)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
				
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists () throws Exception {
		
		//transformando objeto java em Json (string)
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		
		ResultActions result = 
				mockMvc.perform(put("/products/{id}", existId)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		
		//assertions
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
				
	}
	
	@Test
	public void updateShouldRetunrNotFoundExceptionWhenIdNotExists() throws Exception {
		
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		
		ResultActions result =
				mockMvc.perform(put("/products/{id}",nonExistId)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
		
	}	
	
	
}
