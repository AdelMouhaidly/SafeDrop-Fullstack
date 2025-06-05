package com.project.safedrop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.persistence.SequenceGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "alertas")
public class Alerta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "alerta_seq")
    @SequenceGenerator(name = "alerta_seq", sequenceName = "SEQ_ALERTA", allocationSize = 1)
    @Column(name = "id_alerta")
    private Long idAlerta;
    
    @NotBlank(message = "Título é obrigatório")
    @Size(max = 100, message = "Título deve ter no máximo 100 caracteres")
    @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;
    
    @NotBlank(message = "Mensagem é obrigatória")
    @Size(max = 1000, message = "Mensagem deve ter no máximo 1000 caracteres")
    @Column(name = "mensagem", nullable = false, length = 1000)
    private String mensagem;
    
    @NotBlank(message = "Nível de urgência é obrigatório")
    @Pattern(regexp = "baixa|media|alta", message = "Nível deve ser: baixa, media ou alta")
    @Column(name = "nivel_urgencia", nullable = false, length = 20)
    private String nivelUrgencia;
    
    @Column(name = "data_emissao")
    private LocalDateTime dataEmissao;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ocorrencia")
    private Ocorrencia ocorrencia;
    
    @NotBlank(message = "Fonte é obrigatória")
    @Pattern(regexp = "sistema|iot", message = "Fonte deve ser: sistema ou iot")
    @Column(name = "fonte", nullable = false, length = 50)
    private String fonte;
    
    @PrePersist
    protected void onCreate() {
        dataEmissao = LocalDateTime.now();
    }
    
    // Constructors
    public Alerta() {}
    
    public Alerta(String titulo, String mensagem, String nivelUrgencia, Ocorrencia ocorrencia, String fonte) {
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.nivelUrgencia = nivelUrgencia;
        this.ocorrencia = ocorrencia;
        this.fonte = fonte;
    }
    
    // Getters and Setters
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
    
    public Ocorrencia getOcorrencia() { return ocorrencia; }
    public void setOcorrencia(Ocorrencia ocorrencia) { this.ocorrencia = ocorrencia; }
    
    public String getFonte() { return fonte; }
    public void setFonte(String fonte) { this.fonte = fonte; }
}