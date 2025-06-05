package com.project.safedrop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.persistence.SequenceGenerator;

import java.util.List;

@Entity
@Table(name = "abrigos")
public class Abrigo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "abrigo_seq")
    @SequenceGenerator(name = "abrigo_seq", sequenceName = "SEQ_ABRIGO", allocationSize = 1)
    @Column(name = "id_abrigo")
    private Long idAbrigo;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    @Column(name = "nome", nullable = false, length = 100)
    private String nome;
    
    @Size(max = 150, message = "Endereço deve ter no máximo 150 caracteres")
    @Column(name = "endereco", length = 150)
    private String endereco;
    
    @NotNull(message = "Capacidade total é obrigatória")
    @Min(value = 1, message = "Capacidade deve ser maior que zero")
    @Column(name = "capacidade_total", nullable = false)
    private Integer capacidadeTotal;
    
    @NotNull(message = "Vagas disponíveis é obrigatório")
    @Min(value = 0, message = "Vagas disponíveis não pode ser negativo")
    @Column(name = "vagas_disponiveis", nullable = false)
    private Integer vagasDisponiveis;
    
    @Size(max = 20, message = "Telefone deve ter no máximo 20 caracteres")
    @Column(name = "telefone", length = 20)
    private String telefone;
    
    @NotBlank(message = "Status é obrigatório")
    @Pattern(regexp = "disponivel|lotado|inativo", message = "Status deve ser: disponivel, lotado ou inativo")
    @Column(name = "status", nullable = false, length = 20)
    private String status;
    
    @OneToMany(mappedBy = "abrigo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CheckinAbrigo> checkins;
    
    // Constructors
    public Abrigo() {}
    
    public Abrigo(String nome, String endereco, Integer capacidadeTotal, Integer vagasDisponiveis, String telefone, String status) {
        this.nome = nome;
        this.endereco = endereco;
        this.capacidadeTotal = capacidadeTotal;
        this.vagasDisponiveis = vagasDisponiveis;
        this.telefone = telefone;
        this.status = status;
    }
    
    // Getters and Setters
    public Long getIdAbrigo() { return idAbrigo; }
    public void setIdAbrigo(Long idAbrigo) { this.idAbrigo = idAbrigo; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    
    public Integer getCapacidadeTotal() { return capacidadeTotal; }
    public void setCapacidadeTotal(Integer capacidadeTotal) { this.capacidadeTotal = capacidadeTotal; }
    
    public Integer getVagasDisponiveis() { return vagasDisponiveis; }
    public void setVagasDisponiveis(Integer vagasDisponiveis) { this.vagasDisponiveis = vagasDisponiveis; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public List<CheckinAbrigo> getCheckins() { return checkins; }
    public void setCheckins(List<CheckinAbrigo> checkins) { this.checkins = checkins; }
}