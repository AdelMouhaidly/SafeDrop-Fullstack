package com.project.safedrop.repository;

import com.project.safedrop.entity.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    Page<Usuario> findByTipoUsuario(String tipoUsuario, Pageable pageable);
    
    @Query("SELECT u FROM Usuario u WHERE u.nome LIKE %:nome%")
    Page<Usuario> findByNomeContaining(@Param("nome") String nome, Pageable pageable);
    
    @Query("SELECT u FROM Usuario u WHERE u.tipoUsuario = :tipo AND u.nome LIKE %:nome%")
    Page<Usuario> findByTipoUsuarioAndNomeContaining(@Param("tipo") String tipoUsuario, 
                                                    @Param("nome") String nome, 
                                                    Pageable pageable);
}