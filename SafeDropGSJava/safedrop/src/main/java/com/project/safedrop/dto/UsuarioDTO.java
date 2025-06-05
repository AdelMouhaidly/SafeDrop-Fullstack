package com.project.safedrop.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class UsuarioDTO {
    
    private Long idUsuario;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    private String nome;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter formato válido")
    @Size(max = 100, message = "Email deve ter no máximo 100 caracteres")
    private String email;
    
    @NotBlank(message = "Tipo de usuário é obrigatório")
    @Pattern(regexp = "cidadao|voluntario|orgao_publico", message = "Tipo deve ser: cidadao, voluntario ou orgao_publico")
    private String tipoUsuario;
    
    private LocalDateTime dataCadastro;
    
    // Constructors
    public UsuarioDTO() {}
    
    public UsuarioDTO(String nome, String email, String tipoUsuario) {
        this.nome = nome;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }
    
    // Getters and Setters
    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(String tipoUsuario) { this.tipoUsuario = tipoUsuario; }
    
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
}