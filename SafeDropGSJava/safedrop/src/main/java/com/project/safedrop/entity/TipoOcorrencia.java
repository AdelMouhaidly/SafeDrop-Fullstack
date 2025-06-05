package com.project.safedrop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.persistence.SequenceGenerator;
import java.util.List;

@Entity
@Table(name = "tipos_ocorrencia")
public class TipoOcorrencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tipo_ocorrencia_seq")
    @SequenceGenerator(name = "tipo_ocorrencia_seq", sequenceName = "SEQ_TIPO_OCORRENCIA", allocationSize = 1)
    @Column(name = "id_tipo")
    private Long idTipo;
    
    @NotBlank(message = "Nome do tipo é obrigatório")
    @Size(max = 50, message = "Nome deve ter no máximo 50 caracteres")
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    
    @OneToMany(mappedBy = "tipoOcorrencia", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Ocorrencia> ocorrencias;
    
    // Constructors
    public TipoOcorrencia() {}
    
    public TipoOcorrencia(String nome) {
        this.nome = nome;
    }
    
    // Getters and Setters
    public Long getIdTipo() { return idTipo; }
    public void setIdTipo(Long idTipo) { this.idTipo = idTipo; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public List<Ocorrencia> getOcorrencias() { return ocorrencias; }
    public void setOcorrencias(List<Ocorrencia> ocorrencias) { this.ocorrencias = ocorrencias; }
}