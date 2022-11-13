package com.rafaeldeluca.catalogo.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rafaeldeluca.catalogo.entities.Category;
import com.rafaeldeluca.catalogo.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	@Query("SELECT objeto FROM Product objeto "
			+ "INNER JOIN objeto.categories cats "
			+ "WHERE :category IN cats")
	Page<Product> search(Category category, Pageable pageable);

}
