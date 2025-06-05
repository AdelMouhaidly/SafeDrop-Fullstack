package com.project.safedrop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public class CheckinAbrigoDTO {
    
    private Long id;
    
    @NotNull(message = "ID do usuário é obrigatório")
    private Long usuarioId;
    
    private String usuarioNome;
    
    @NotNull(message = "ID do abrigo é obrigatório")
    private Long abrigoId;
    
    private String abrigoNome;
    
    private LocalDateTime dataCheckin;
    
    private LocalDateTime dataCheckout;
    
    private String status;
    
    @Size(max = 200, message = "Observações devem ter no máximo 200 caracteres")
    private String observacoes;
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    
    public String getUsuarioNome() { return usuarioNome; }
    public void setUsuarioNome(String usuarioNome) { this.usuarioNome = usuarioNome; }
    
    public Long getAbrigoId() { return abrigoId; }
    public void setAbrigoId(Long abrigoId) { this.abrigoId = abrigoId; }
    
    public String getAbrigoNome() { return abrigoNome; }
    public void setAbrigoNome(String abrigoNome) { this.abrigoNome = abrigoNome; }
    
    public LocalDateTime getDataCheckin() { return dataCheckin; }
    public void setDataCheckin(LocalDateTime dataCheckin) { this.dataCheckin = dataCheckin; }
    
    public LocalDateTime getDataCheckout() { return dataCheckout; }
    public void setDataCheckout(LocalDateTime dataCheckout) { this.dataCheckout = dataCheckout; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}