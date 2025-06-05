package com.project.safedrop.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OcorrenciaDTO {
    
    private Long idOcorrencia;
    
    private Long idUsuario;
    private String nomeUsuario;
    
    @NotNull(message = "Tipo de ocorrência é obrigatório")
    private Long idTipo;
    private String nomeTipo;
    
    @Size(max = 1000, message = "Descrição deve ter no máximo 1000 caracteres")
    private String descricao;
    
    @DecimalMin(value = "-90.0", message = "Latitude deve estar entre -90 e 90")
    @DecimalMax(value = "90.0", message = "Latitude deve estar entre -90 e 90")
    private BigDecimal latitude;
    
    @DecimalMin(value = "-180.0", message = "Longitude deve estar entre -180 e 180")
    @DecimalMax(value = "180.0", message = "Longitude deve estar entre -180 e 180")
    private BigDecimal longitude;
    
    @NotNull(message = "Data da ocorrência é obrigatória")
    private LocalDateTime dataOcorrencia;
    
    @NotBlank(message = "Nível de risco é obrigatório")
    @Pattern(regexp = "baixo|moderado|alto", message = "Nível deve ser: baixo, moderado ou alto")
    private String nivelRisco;
    
    @NotBlank(message = "Status é obrigatório")
    @Pattern(regexp = "em andamento|resolvido", message = "Status deve ser: em andamento ou resolvido")
    private String status;
    
    // Constructors
    public OcorrenciaDTO() {}
    
    // Getters and Setters
    public Long getIdOcorrencia() { return idOcorrencia; }
    public void setIdOcorrencia(Long idOcorrencia) { this.idOcorrencia = idOcorrencia; }
    
    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }
    
    public String getNomeUsuario() { return nomeUsuario; }
    public void setNomeUsuario(String nomeUsuario) { this.nomeUsuario = nomeUsuario; }
    
    public Long getIdTipo() { return idTipo; }
    public void setIdTipo(Long idTipo) { this.idTipo = idTipo; }
    
    public String getNomeTipo() { return nomeTipo; }
    public void setNomeTipo(String nomeTipo) { this.nomeTipo = nomeTipo; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }
    
    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }
    
    public LocalDateTime getDataOcorrencia() { return dataOcorrencia; }
    public void setDataOcorrencia(LocalDateTime dataOcorrencia) { this.dataOcorrencia = dataOcorrencia; }
    
    public String getNivelRisco() { return nivelRisco; }
    public void setNivelRisco(String nivelRisco) { this.nivelRisco = nivelRisco; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}