package com.rafaeldeluca.catalogo.services;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rafaeldeluca.catalogo.dto.CategoryDTO;
import com.rafaeldeluca.catalogo.entities.Category;
import com.rafaeldeluca.catalogo.repositories.CategoryRepository;
import com.rafaeldeluca.catalogo.services.exceptions.DataBaseException;
import com.rafaeldeluca.catalogo.services.exceptions.ResourceNotFoundException;


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
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {		
		
		Optional<Category> object = repository.findById(id);
		Category entity = object.orElseThrow(() -> new ResourceNotFoundException("Entidade não foi encontrada!"));
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}
	
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		//não toca no banco de dados, instancia um objeto provisório com o id informado
		//só movimenta o banco de dados quando for dar o update no banco
		try {
			Category entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new CategoryDTO(entity);
		} catch (EntityNotFoundException error) {
			throw new ResourceNotFoundException("Id dessa categoria não foi encontrado " + id);
		}		
		
		
	}
	//Não pode deletar um categoria que já tem produto cadastrado
	//erro de integridade referencial
	public void delete(Long id) {
		
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException erro) {
			throw new ResourceNotFoundException("Id não encontrado " + id);
		} catch (DataIntegrityViolationException erro) {
			throw new DataBaseException("Violação de integridade de banco de dados!");
		}
		
		
				
	}	

}
