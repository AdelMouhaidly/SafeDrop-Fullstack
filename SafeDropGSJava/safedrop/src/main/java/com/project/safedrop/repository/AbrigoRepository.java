package com.project.safedrop.repository;

import com.project.safedrop.dto.AbrigoDTO;
import com.project.safedrop.entity.Abrigo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbrigoRepository extends JpaRepository<Abrigo, Long> {
    
    Page<Abrigo> findByStatus(String status, Pageable pageable);
    
    @Query("SELECT a FROM Abrigo a WHERE a.vagasDisponiveis > 0 AND a.status = 'disponivel'")
    List<Abrigo> findAbrigosDisponiveis();
    
    @Query("SELECT a FROM Abrigo a WHERE a.nome LIKE %:nome%")
    Page<Abrigo> findByNomeContaining(@Param("nome") String nome, Pageable pageable);
    
    @Query("SELECT a FROM Abrigo a WHERE a.endereco LIKE %:endereco%")
    Page<Abrigo> findByEnderecoContaining(@Param("endereco") String endereco, Pageable pageable);

    Page<AbrigoDTO> findByStatusAndVagasDisponiveisGreaterThan(String string, int i, Pageable pageable);
}