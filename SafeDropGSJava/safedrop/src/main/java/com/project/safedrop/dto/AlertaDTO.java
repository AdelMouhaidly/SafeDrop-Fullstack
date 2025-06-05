package com.project.safedrop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public class AlertaDTO {
    
    private Long idAlerta;
    
    @NotBlank(message = "Título é obrigatório")
    @Size(max = 100, message = "Título deve ter no máximo 100 caracteres")
    private String titulo;
    
    @NotBlank(message = "Mensagem é obrigatória")
    @Size(max = 1000, message = "Mensagem deve ter no máximo 1000 caracteres")
    private String mensagem;
    
    @NotBlank(message = "Nível de urgência é obrigatório")
    @Pattern(regexp = "baixa|media|alta", message = "Nível deve ser: baixa, media ou alta")
    private String nivelUrgencia;
    
    private LocalDateTime dataEmissao;
    
    private Long idOcorrencia;
    
    @NotBlank(message = "Fonte é obrigatória")
    @Pattern(regexp = "sistema|iot", message = "Fonte deve ser: sistema ou iot")
    private String fonte;
    
    // Constructors
    public AlertaDTO() {}
    
    // Getters e Setters
    public Long getIdAlerta() { return idAlerta; }
    public void setIdAlerta(Long idAlerta) { this.idAlerta = idAlerta; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
    
    public String getNivelUrgencia() { return nivelUrgencia; }
    public void setNivelUrgencia(String nivelUrgencia) { this.nivelUrgencia = nivelUrgencia; }
    
    public LocalDateTime getDataEmissao() { return dataEmissao; }
    public void setDataEmissao(LocalDateTime dataEmissao) { this.dataEmissao = dataEmissao; }
    
    public Long getIdOcorrencia() { return idOcorrencia; }
    public void setIdOcorrencia(Long idOcorrencia) { this.idOcorrencia = idOcorrencia; }
    
    public String getFonte() { return fonte; }
    public void setFonte(String fonte) { this.fonte = fonte; }
}