package com.rafaeldeluca.catalogo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rafaeldeluca.catalogo.dto.CategoryDTO;
import com.rafaeldeluca.catalogo.entities.Category;
import com.rafaeldeluca.catalogo.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		List<Category> list = repository.findAll();
		// transforma para stream e depois volta para lista
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		/*
		 * List<CategoryDTO> listDTO = new ArrayList<>(); for(Category categoria : list)
		 * { listDTO.add(new CategoryDTO(categoria)); }
		 */
		

	}

}
