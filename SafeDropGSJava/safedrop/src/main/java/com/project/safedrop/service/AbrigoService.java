package com.project.safedrop.service;

import com.project.safedrop.dto.AbrigoDTO;
import com.project.safedrop.entity.Abrigo;
import com.project.safedrop.repository.AbrigoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AbrigoService {
    
    @Autowired
    private AbrigoRepository abrigoRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public AbrigoDTO criarAbrigo(AbrigoDTO abrigoDTO) {
        Abrigo abrigo = new Abrigo();
        abrigo.setNome(abrigoDTO.getNome());
        abrigo.setEndereco(abrigoDTO.getEndereco());
        abrigo.setCapacidadeTotal(abrigoDTO.getCapacidade());
        abrigo.setVagasDisponiveis(abrigoDTO.getCapacidade()); 
        abrigo.setTelefone(abrigoDTO.getTelefone());
        abrigo.setStatus("disponivel"); 
        
        Abrigo abrigoSalvo = abrigoRepository.save(abrigo);
 
        AbrigoDTO resultado = new AbrigoDTO();
        resultado.setId(abrigoSalvo.getIdAbrigo());
        resultado.setNome(abrigoSalvo.getNome());
        resultado.setEndereco(abrigoSalvo.getEndereco());
        resultado.setCapacidade(abrigoSalvo.getCapacidadeTotal());
        resultado.setOcupacaoAtual(abrigoSalvo.getCapacidadeTotal() - abrigoSalvo.getVagasDisponiveis());
        resultado.setStatus(abrigoSalvo.getStatus());
        resultado.setTelefone(abrigoSalvo.getTelefone());
        
        return resultado;
    }
    
    public Page<AbrigoDTO> listarAbrigos(Pageable pageable) {
        return abrigoRepository.findAll(pageable)
            .map(abrigo -> modelMapper.map(abrigo, AbrigoDTO.class));
    }
    
    public Page<AbrigoDTO> buscarPorStatus(String status, Pageable pageable) {
        return abrigoRepository.findByStatus(status, pageable)
            .map(abrigo -> modelMapper.map(abrigo, AbrigoDTO.class));
    }
    
    public Page<AbrigoDTO> buscarComVagas(Pageable pageable) {
        return abrigoRepository.findByStatusAndVagasDisponiveisGreaterThan("disponivel", 0, pageable)
            .map(abrigo -> modelMapper.map(abrigo, AbrigoDTO.class));
    }
    
    public Optional<AbrigoDTO> buscarPorId(Long id) {
        return abrigoRepository.findById(id)
            .map(abrigo -> modelMapper.map(abrigo, AbrigoDTO.class));
    }
    
    public AbrigoDTO atualizarAbrigo(Long id, AbrigoDTO abrigoDTO) {
        Abrigo abrigo = abrigoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Abrigo não encontrado"));
        
        abrigo.setNome(abrigoDTO.getNome());
        abrigo.setEndereco(abrigoDTO.getEndereco());
        abrigo.setCapacidadeTotal(abrigoDTO.getCapacidade());
        abrigo.setTelefone(abrigoDTO.getTelefone());
        abrigo.setStatus(abrigoDTO.getStatus());
        
        Abrigo abrigoAtualizado = abrigoRepository.save(abrigo);
        return modelMapper.map(abrigoAtualizado, AbrigoDTO.class);
    }
    
    public AbrigoDTO atualizarVagas(Long id, Integer novasVagas) {
        Abrigo abrigo = abrigoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Abrigo não encontrado"));
        
        abrigo.setVagasDisponiveis(novasVagas);
  
        if (novasVagas <= 0) {
            abrigo.setStatus("lotado");
        } else {
            abrigo.setStatus("disponivel");
        }
        
        Abrigo abrigoAtualizado = abrigoRepository.save(abrigo);
        return modelMapper.map(abrigoAtualizado, AbrigoDTO.class);
    }
    
    public AbrigoDTO atualizarOcupacao(Long id, Integer ocupacao) {
        Abrigo abrigo = abrigoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Abrigo não encontrado"));
      
        Integer vagasDisponiveis = abrigo.getCapacidadeTotal() - ocupacao;
        abrigo.setVagasDisponiveis(Math.max(0, vagasDisponiveis));

        if (vagasDisponiveis <= 0) {
            abrigo.setStatus("lotado");
        } else {
            abrigo.setStatus("disponivel");
        }
        
        Abrigo abrigoAtualizado = abrigoRepository.save(abrigo);
        return modelMapper.map(abrigoAtualizado, AbrigoDTO.class);
    }
    
    public void deletarAbrigo(Long id) {
        if (!abrigoRepository.existsById(id)) {
            throw new RuntimeException("Abrigo não encontrado");
        }
        abrigoRepository.deleteById(id);
    }

    public Page<AbrigoDTO> buscarPorAtivo(Boolean ativo, Pageable pageable) {
        String status = ativo ? "disponivel" : "inativo";
        return abrigoRepository.findByStatus(status, pageable)
            .map(abrigo -> modelMapper.map(abrigo, AbrigoDTO.class));
    }
}