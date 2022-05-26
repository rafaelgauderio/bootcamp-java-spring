package com.rafaeldeluca.catalogo.resources.exceptions;


import java.time.Instant;

import javax.servlet.http.HttpServletRequest;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

//atentar para importar a exceção personalizada
import com.rafaeldeluca.catalogo.services.exceptions.ResourceNotFoundException;

//permite que essa classe intercepte alguma exceção que acontecer
@ControllerAdvice
public class ResourceExceptionHandler {
	//handler = classe manipuladora
	//para saber qual tipo de exceção vai ser interceptada
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(ResourceNotFoundException error, HttpServletRequest request) {
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.NOT_FOUND.value());
		err.setError("Recurso não encontrado");
		err.setMessage(error.getMessage());
		err.setPath(request.getRequestURI());
		//método status permite customizar o status a ser retornado
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}

}
