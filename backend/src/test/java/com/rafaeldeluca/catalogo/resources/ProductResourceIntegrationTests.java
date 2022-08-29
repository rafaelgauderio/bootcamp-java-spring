package com.rafaeldeluca.catalogo.resources;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rafaeldeluca.catalogo.dto.ProductDTO;
import com.rafaeldeluca.catalogo.tests.Factory;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductResourceIntegrationTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	private Long existId;
	private Long nonExistId;
	private Long countTotalProducts;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	
	@BeforeEach
	void setUp() throws Exception {
		
		existId = 2L;
		nonExistId = 50L;
		countTotalProducts = 25L;
		
	}
	
	@Test
	public void findAllShouldReturnSortedPageWhenSortByName () throws Exception {
		
		ResultActions resulted =
				mockMvc.perform(get("/products?page=0&size=25&sort=name,asc")
						.accept(MediaType.APPLICATION_JSON));
				
		resulted.andExpect(status().isOk());
		resulted.andExpect(jsonPath("$.totalElements").value(countTotalProducts));
		resulted.andExpect(jsonPath("$.size").value(countTotalProducts));
		resulted.andExpect(jsonPath("$.totalPages").value(1));
		resulted.andExpect(jsonPath("$.last").value(true));
		resulted.andExpect(jsonPath("$.content").exists());
		resulted.andExpect(jsonPath("$.content[0].name").value("Macbook Pro"));
		resulted.andExpect(jsonPath("$.content[1].name").value("PC Gamer"));
		resulted.andExpect(jsonPath("$.content[2].name").value("PC Gamer Alfa"));
		resulted.andExpect(jsonPath("$.content[3].name").value("PC Gamer Boo"));
	}
	
	
	@Test
	public void updateShouldRetunrProductDTOWhenIdExists() throws Exception {
		
		ProductDTO productDTO = Factory.createProductDTO();
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		
		Double expectedPrice = productDTO.getPrice();
		String expectedName = productDTO.getName();
		String expectedDescription = productDTO.getDescription();
		String expectedImgURL = productDTO.getImgURL();
		
		//atualiza
		ResultActions resulted = 
				mockMvc.perform(put("/products/{id}",existId)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));
		
		//Assertions
		resulted.andExpect(status().isOk());
		resulted.andExpect(jsonPath("$.id").value(existId));
		resulted.andExpect(jsonPath("$.price").value(expectedPrice));
		resulted.andExpect(jsonPath("$.name").value(expectedName));
		resulted.andExpect(jsonPath("$.description").value(expectedDescription));
		resulted.andExpect(jsonPath("$.imgURL").value(expectedImgURL));
	}
	
	
	
	
	@Test
	public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		
		ProductDTO productDTO = Factory.createProductDTO();
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		
		ResultActions resulted = 
				mockMvc.perform(put("/products/{id}",nonExistId)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));
		
		//404 - not Found se passar um Id que não existe no update
		resulted.andExpect(status().isNotFound());	
		
	}
	
	@Test
	public void insertShouldReturnCreatedAndProductDTO () throws Exception {
		
		ProductDTO productDTO = Factory.createProductDTO();
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		
		ResultActions result = mockMvc.perform(post("/products")
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		result.andExpect(jsonPath("$.price").exists());
		result.andExpect(jsonPath("$.imgURL").exists());
	}	
	
	
	
	
	
	

}
