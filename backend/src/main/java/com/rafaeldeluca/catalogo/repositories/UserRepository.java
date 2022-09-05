package com.rafaeldeluca.catalogo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rafaeldeluca.catalogo.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}