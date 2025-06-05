package com.project.safedrop.dto;

import jakarta.validation.constraints.*;

public class TipoOcorrenciaDTO {
    
    private Long idTipo;
    
    @NotBlank(message = "Nome do tipo é obrigatório")
    @Size(max = 50, message = "Nome deve ter no máximo 50 caracteres")
    private String nome;
    
    // Constructors
    public TipoOcorrenciaDTO() {}
    
    public TipoOcorrenciaDTO(String nome) {
        this.nome = nome;
    }
    
    public TipoOcorrenciaDTO(Long idTipo, String nome) {
        this.idTipo = idTipo;
        this.nome = nome;
    }
    
    // Getters and Setters
    public Long getIdTipo() {
        return idTipo;
    }
    
    public void setIdTipo(Long idTipo) {
        this.idTipo = idTipo;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
}