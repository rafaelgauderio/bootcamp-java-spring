package com.rafaeldeluca.catalogo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rafaeldeluca.catalogo.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
