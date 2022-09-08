package com.rafaeldeluca.catalogo.services;


import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rafaeldeluca.catalogo.dto.RoleDTO;
import com.rafaeldeluca.catalogo.dto.UserDTO;
import com.rafaeldeluca.catalogo.dto.UserInsertDTO;
import com.rafaeldeluca.catalogo.dto.UserUpdateDTO;
import com.rafaeldeluca.catalogo.entities.Role;
import com.rafaeldeluca.catalogo.entities.User;
import com.rafaeldeluca.catalogo.repositories.RoleRepository;
import com.rafaeldeluca.catalogo.repositories.UserRepository;
import com.rafaeldeluca.catalogo.services.exceptions.DataBaseException;
import com.rafaeldeluca.catalogo.services.exceptions.ResourceNotFoundException;

@Service
public class UserService {
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;	
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {
		Page<User> list = repository.findAll(pageable);
		return list.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional <User> object = repository.findById(id);
		User entity = object.orElseThrow(() -> new ResourceNotFoundException("Entidade não encontrada"));
		UserDTO userDto = new UserDTO(entity);
		return userDto;
	}
	
	@Transactional
	public UserDTO insert (UserInsertDTO dto) {
		User entity = new User ();
		copyDtoToEntity(dto, entity);
		//converter a string da senha em um hash com o metodo encode e fica salvo no database esse hash da senha
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));	
		entity = repository.save(entity);
		UserDTO userInsertDto = new UserDTO(entity);
		return userInsertDto;		
	}
	
	@Transactional
	public UserDTO update (Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id); //getOne não vai no database, instância uma entidade monitorada no Jpa 
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			UserDTO userDto = new UserDTO(entity);
			return userDto;		
		} catch (EntityNotFoundException error) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		
	}		
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch(DataIntegrityViolationException error) {
			throw new DataBaseException("Integrety violation.");
		} catch (EmptyResultDataAccessException error) {
			throw new ResourceNotFoundException("Reported id not found.");
		}
	}

	private void copyDtoToEntity(UserDTO dto, User entity) {
		
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		
		entity.getRoles().clear();
		
		for(RoleDTO nickname : dto.getRoles()) {
			Role role = roleRepository.getOne(nickname.getId()); //getOne não vai no database, instância uma entidade monitorada no Jpa 
			entity.getRoles().add(role);	
		}
		
	}

}
