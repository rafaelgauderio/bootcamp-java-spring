package com.rafaeldeluca.catalogo.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.rafaeldeluca.catalogo.entities.Category;

public class CategoryDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank (message = "Campo nome da categoria de preenchimento obrigatório.")
	@Size(min = 3, max = 50, message ="Nome da categoria deve ter entre 3 e 50 caracteres.")
	private String name;
	
	public CategoryDTO () {
		
	}	
	

	public CategoryDTO(Long id, String name) {		
		this.id = id;
		this.name = name;
	}
	
	public CategoryDTO(Category entity) {
		this.id=entity.getId();
		this.name=entity.getName();
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

}
