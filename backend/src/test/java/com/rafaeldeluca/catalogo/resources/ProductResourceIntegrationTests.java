package com.rafaeldeluca.catalogo.resources;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductResourceIntegrationTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	private Long existId;
	private Long nonExistId;
	private Long countTotalProducts;
	
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
		resulted.andExpect(jsonPath("$.first").value(true));
		resulted.andExpect(jsonPath("$.last").value(true));
		resulted.andExpect(jsonPath("$.content").exists());
		resulted.andExpect(jsonPath("$.content").exists());
		resulted.andExpect(jsonPath("$.content[0].name").value("Macbook Pro"));
		resulted.andExpect(jsonPath("$.content[1].name").value("PC Gamer"));
		resulted.andExpect(jsonPath("$.content[2].name").value("PC Gamer Alfa"));
		resulted.andExpect(jsonPath("$.content[3].name").value("PC Gamer Boo"));
	}
	
	
	
	

}
