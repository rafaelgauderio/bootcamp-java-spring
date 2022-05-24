package com.rafaeldeluca.catalogo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rafaeldeluca.catalogo.entities.Category;
import com.rafaeldeluca.catalogo.repositories.CategoryRepository;

@Service
public class CategoryService {	
	
	
	@Autowired
	private CategoryRepository repository;
	
	public List<Category> findAll() {
		return repository.findAll();
	}
	
	
	
	

}
