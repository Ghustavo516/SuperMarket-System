package com.api.supermarket_api.Mercado.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.supermarket_api.Mercado.entity.Cliente;

public interface ClienteRepository extends JpaRepository <Cliente, Long>{
    
}
