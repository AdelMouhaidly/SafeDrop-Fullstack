package com.project.safedrop.repository;

import com.project.safedrop.entity.Ocorrencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
    
    Page<Ocorrencia> findByUsuarioIdUsuario(Long idUsuario, Pageable pageable);
    
    Page<Ocorrencia> findByStatus(String status, Pageable pageable);
    
    Page<Ocorrencia> findByNivelRisco(String nivelRisco, Pageable pageable);
    
    Page<Ocorrencia> findByTipoOcorrenciaIdTipo(Long idTipo, Pageable pageable);
    
    @Query("SELECT o FROM Ocorrencia o WHERE o.dataOcorrencia BETWEEN :inicio AND :fim")
    Page<Ocorrencia> findByDataOcorrenciaBetween(@Param("inicio") LocalDateTime inicio, 
                                               @Param("fim") LocalDateTime fim, 
                                               Pageable pageable);
    
    @Query("SELECT o FROM Ocorrencia o WHERE o.status = :status AND o.nivelRisco = :nivelRisco")
    Page<Ocorrencia> findByStatusAndNivelRisco(@Param("status") String status, 
                                             @Param("nivelRisco") String nivelRisco, 
                                             Pageable pageable);
    
    @Query("SELECT o FROM Ocorrencia o WHERE o.descricao LIKE %:termo%")
    Page<Ocorrencia> findByDescricaoContaining(@Param("termo") String termo, Pageable pageable);
    
    List<Ocorrencia> findTop10ByOrderByDataOcorrenciaDesc();
}