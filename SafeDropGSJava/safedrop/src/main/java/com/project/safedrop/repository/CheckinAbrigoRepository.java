package com.project.safedrop.repository;

import com.project.safedrop.entity.CheckinAbrigo;
import com.project.safedrop.entity.Usuario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CheckinAbrigoRepository extends JpaRepository<CheckinAbrigo, Long> {
    
    Page<CheckinAbrigo> findByUsuarioIdUsuario(Long idUsuario, Pageable pageable);
    
    Page<CheckinAbrigo> findByAbrigoIdAbrigo(Long idAbrigo, Pageable pageable);
    
    @Query("SELECT c FROM CheckinAbrigo c WHERE c.usuario.idUsuario = :idUsuario AND c.dataSaida IS NULL")
    Optional<CheckinAbrigo> findCheckinAtivoByUsuario(@Param("idUsuario") Long idUsuario);
    
    @Query("SELECT c FROM CheckinAbrigo c WHERE c.abrigo.idAbrigo = :idAbrigo AND c.dataSaida IS NULL")
    List<CheckinAbrigo> findCheckinsAtivosByAbrigo(@Param("idAbrigo") Long idAbrigo);
    
    @Query("SELECT COUNT(c) FROM CheckinAbrigo c WHERE c.abrigo.idAbrigo = :idAbrigo AND c.dataSaida IS NULL")
    Long countCheckinsAtivosByAbrigo(@Param("idAbrigo") Long idAbrigo);

    Optional<CheckinAbrigo> findByUsuarioAndDataSaidaIsNull(Usuario usuario);
}