package com.rafaeldeluca.catalogo.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.web.servlet.MockMvc;

import com.rafaeldeluca.catalogo.dto.ProductDTO;
import com.rafaeldeluca.catalogo.services.ProductService;
import com.rafaeldeluca.catalogo.tests.Factory;

@WebMvcTest(ProductResource.class)
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;
	
	private ProductDTO productDTO;
	//criando um objeto de pagina completo com PageImpl
	private PageImpl<ProductDTO> pageImpl;
	
	//simular o comportamento do service (findAllPage)
	@BeforeEach
	void setUp() throws Exception {
		
		productDTO = Factory.createProductDTO();
		pageImpl = new PageImpl<>(List.of(productDTO));
		
		when(service.findAllPaged(any())).thenReturn(pageImpl);		
		
	}
	
	@Test
	public void findAllShouldReturnPage() {		
		//perfom faz um requisição no metodo http get e esperar que a resposta seja ok
		try {
			mockMvc.perform(get("/products")).andExpect(status().isOk());
		} catch (Exception e) {			
			e.printStackTrace();
		}
		
	}
	
}
