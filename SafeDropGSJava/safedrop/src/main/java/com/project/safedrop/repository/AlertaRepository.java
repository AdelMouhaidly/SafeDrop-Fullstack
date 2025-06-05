package com.project.safedrop.repository;

import com.project.safedrop.entity.Alerta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    
    Page<Alerta> findByNivelUrgencia(String nivelUrgencia, Pageable pageable);
    
    Page<Alerta> findByFonte(String fonte, Pageable pageable);
    
    Page<Alerta> findByOcorrenciaIdOcorrencia(Long idOcorrencia, Pageable pageable);
    
    @Query("SELECT a FROM Alerta a WHERE a.dataEmissao BETWEEN :inicio AND :fim")
    Page<Alerta> findByDataEmissaoBetween(@Param("inicio") LocalDateTime inicio, 
                                        @Param("fim") LocalDateTime fim, 
                                        Pageable pageable);
    
    @Query("SELECT a FROM Alerta a ORDER BY a.dataEmissao DESC")
    List<Alerta> findTop10ByOrderByDataEmissaoDesc(Pageable pageable);
}