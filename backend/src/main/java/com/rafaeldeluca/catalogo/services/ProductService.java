package com.rafaeldeluca.catalogo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rafaeldeluca.catalogo.dto.ProductDTO;
import com.rafaeldeluca.catalogo.entities.Product;
import com.rafaeldeluca.catalogo.repositories.ProductRepository;
import com.rafaeldeluca.catalogo.services.exceptions.DataBaseException;
import com.rafaeldeluca.catalogo.services.exceptions.ResourceNotFoundException;


@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page <Product> paginatedList = repository.findAll(pageRequest);		
		return paginatedList.map(x-> new ProductDTO(x));
		
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {		
		
		Optional<Product> object = repository.findById(id);
		Product entity = object.orElseThrow(() -> new ResourceNotFoundException("Entidade não foi encontrada!"));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		//entity.setName(dto.getName());		
		entity = repository.save(entity);
		return new ProductDTO(entity);
	}
	
	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		
		try {
			Product entity = repository.getOne(id);
			//entity.setName(dto.getName());
			entity = repository.save(entity);
			return new ProductDTO(entity);
		} catch (EntityNotFoundException error) {
			throw new ResourceNotFoundException("Id desse produto não foi encontrado " + id);
		}
		
		
	}
	
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
