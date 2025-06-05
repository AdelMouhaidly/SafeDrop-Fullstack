package com.project.safedrop.repository;

import com.project.safedrop.entity.TipoOcorrencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TipoOcorrenciaRepository extends JpaRepository<TipoOcorrencia, Long> {
    
    Optional<TipoOcorrencia> findByNome(String nome);
    
    boolean existsByNome(String nome);
}