package com.project.safedrop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.persistence.SequenceGenerator;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ocorrencias")
public class Ocorrencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ocorrencia_seq")
    @SequenceGenerator(name = "ocorrencia_seq", sequenceName = "SEQ_OCORRENCIA", allocationSize = 1)
    @Column(name = "id_ocorrencia")
    private Long idOcorrencia;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo")
    private TipoOcorrencia tipoOcorrencia;
    
    @Size(max = 1000, message = "Descrição deve ter no máximo 1000 caracteres")
    @Column(name = "descricao", length = 1000)
    private String descricao;
    
    @DecimalMin(value = "-90.0", message = "Latitude deve estar entre -90 e 90")
    @DecimalMax(value = "90.0", message = "Latitude deve estar entre -90 e 90")
    @Column(name = "latitude", precision = 10, scale = 7)
    private BigDecimal latitude;
    
    @DecimalMin(value = "-180.0", message = "Longitude deve estar entre -180 e 180")
    @DecimalMax(value = "180.0", message = "Longitude deve estar entre -180 e 180")
    @Column(name = "longitude", precision = 10, scale = 7)
    private BigDecimal longitude;
    
    @NotNull(message = "Data da ocorrência é obrigatória")
    @Column(name = "data_ocorrencia", nullable = false)
    private LocalDateTime dataOcorrencia;
    
    @NotBlank(message = "Nível de risco é obrigatório")
    @Pattern(regexp = "baixo|moderado|alto", message = "Nível deve ser: baixo, moderado ou alto")
    @Column(name = "nivel_risco", nullable = false, length = 20)
    private String nivelRisco;
    
    @NotBlank(message = "Status é obrigatório")
    @Pattern(regexp = "em andamento|resolvido", message = "Status deve ser: em andamento ou resolvido")
    @Column(name = "status", nullable = false, length = 20)
    private String status;
    
    @OneToMany(mappedBy = "ocorrencia", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Alerta> alertas;
    
    // Constructors
    public Ocorrencia() {}
    
    public Ocorrencia(Usuario usuario, TipoOcorrencia tipoOcorrencia, String descricao, 
                     BigDecimal latitude, BigDecimal longitude, LocalDateTime dataOcorrencia, 
                     String nivelRisco, String status) {
        this.usuario = usuario;
        this.tipoOcorrencia = tipoOcorrencia;
        this.descricao = descricao;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dataOcorrencia = dataOcorrencia;
        this.nivelRisco = nivelRisco;
        this.status = status;
    }
    
    // Getters and Setters
    public Long getIdOcorrencia() { return idOcorrencia; }
    public void setIdOcorrencia(Long idOcorrencia) { this.idOcorrencia = idOcorrencia; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public TipoOcorrencia getTipoOcorrencia() { return tipoOcorrencia; }
    public void setTipoOcorrencia(TipoOcorrencia tipoOcorrencia) { this.tipoOcorrencia = tipoOcorrencia; }
    
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
    
    public List<Alerta> getAlertas() { return alertas; }
    public void setAlertas(List<Alerta> alertas) { this.alertas = alertas; }
}