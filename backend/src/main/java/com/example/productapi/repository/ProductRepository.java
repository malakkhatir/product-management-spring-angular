package com.example.productapi.repository;

import com.example.productapi.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // AJOUTE cette ligne ici (recherche par nom)
    List<Product> findByNameContainingIgnoreCase(String name);

}