package com.rafaeldeluca.catalogo.dto;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.rafaeldeluca.catalogo.entities.Category;
import com.rafaeldeluca.catalogo.entities.Product;

public class ProductDTO {
	
	private Long id;
	private String name;
	private String description;
	private Double price;
	private String imgURL;
	private Instant date;
	
	private List<CategoryDTO> categories = new ArrayList<>();
	
	public ProductDTO() {
		
	}

	//Não usar colecoes em construtores
	public ProductDTO(Long id, String name, String description, Double price, String imgURL, Instant date) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.imgURL = imgURL;
		this.date = date;
	}
	
	public ProductDTO(Product product) {
		this.id= product.getId();
		this.name= product.getName();
		this.description=product.getDescription();
		this.price=product.getPrice();
		this.imgURL=product.getImgUrl();
		this.date=product.getDate();
	}
	//sobrecarga com a coleção de lista de categorias
	public ProductDTO(Product product, Set<Category> categories ) {
		this(product);
		categories.forEach(cate -> this.categories.add(new CategoryDTO(cate)));
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImgURL() {
		return imgURL;
	}

	public void setImgURL(String imgURL) {
		this.imgURL = imgURL;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public List<CategoryDTO> getCategories() {
		return categories;
	}

	public void setCategories(List<CategoryDTO> categories) {
		this.categories = categories;
	}
	
	
	

}
