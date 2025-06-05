package com.project.safedrop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.persistence.SequenceGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "checkins_abrigos")
public class CheckinAbrigo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "checkin_seq")
    @SequenceGenerator(name = "checkin_seq", sequenceName = "SEQ_CHECKIN_ABRIGO", allocationSize = 1)
    @Column(name = "id_checkin")
    private Long idCheckin;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_abrigo")
    private Abrigo abrigo;
    
    @NotNull(message = "Data de entrada é obrigatória")
    @Column(name = "data_entrada", nullable = false)
    private LocalDateTime dataEntrada;
    
    @Column(name = "data_saida")
    private LocalDateTime dataSaida;
    
    // Constructors
    public CheckinAbrigo() {}
    
    public CheckinAbrigo(Usuario usuario, Abrigo abrigo, LocalDateTime dataEntrada) {
        this.usuario = usuario;
        this.abrigo = abrigo;
        this.dataEntrada = dataEntrada;
    }
    
    // Getters and Setters
    public Long getIdCheckin() { return idCheckin; }
    public void setIdCheckin(Long idCheckin) { this.idCheckin = idCheckin; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public Abrigo getAbrigo() { return abrigo; }
    public void setAbrigo(Abrigo abrigo) { this.abrigo = abrigo; }
    
    public LocalDateTime getDataEntrada() { return dataEntrada; }
    public void setDataEntrada(LocalDateTime dataEntrada) { this.dataEntrada = dataEntrada; }
    
    public LocalDateTime getDataSaida() { return dataSaida; }
    public void setDataSaida(LocalDateTime dataSaida) { this.dataSaida = dataSaida; }
}