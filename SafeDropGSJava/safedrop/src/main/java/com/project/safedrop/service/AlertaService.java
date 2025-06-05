package com.project.safedrop.service;

import com.project.safedrop.dto.AlertaDTO;
import com.project.safedrop.entity.Alerta;
import com.project.safedrop.entity.Ocorrencia;
import com.project.safedrop.repository.AlertaRepository;
import com.project.safedrop.repository.OcorrenciaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AlertaService {
    
    @Autowired
    private AlertaRepository alertaRepository;
    
    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public AlertaDTO criarAlerta(AlertaDTO alertaDTO) {
        Alerta alerta = new Alerta();
        alerta.setTitulo(alertaDTO.getTitulo());
        alerta.setMensagem(alertaDTO.getMensagem());
        alerta.setNivelUrgencia(alertaDTO.getNivelUrgencia());
        alerta.setFonte(alertaDTO.getFonte());
        alerta.setDataEmissao(LocalDateTime.now());

        if (alertaDTO.getIdOcorrencia() != null) {
            Ocorrencia ocorrencia = ocorrenciaRepository.findById(alertaDTO.getIdOcorrencia())
                .orElseThrow(() -> new RuntimeException("Ocorrência não encontrada"));
            alerta.setOcorrencia(ocorrencia);
        }
        
        Alerta alertaSalvo = alertaRepository.save(alerta);

        AlertaDTO resultado = new AlertaDTO();
        resultado.setIdAlerta(alertaSalvo.getIdAlerta());
        resultado.setTitulo(alertaSalvo.getTitulo());
        resultado.setMensagem(alertaSalvo.getMensagem());
        resultado.setNivelUrgencia(alertaSalvo.getNivelUrgencia());
        resultado.setDataEmissao(alertaSalvo.getDataEmissao());
        resultado.setFonte(alertaSalvo.getFonte());
        if (alertaSalvo.getOcorrencia() != null) {
            resultado.setIdOcorrencia(alertaSalvo.getOcorrencia().getIdOcorrencia());
        }
        
        return resultado;
    }
    
    public Page<AlertaDTO> listarAlertas(Pageable pageable) {
        return alertaRepository.findAll(pageable)
            .map(alerta -> modelMapper.map(alerta, AlertaDTO.class));
    }
    
    public Page<AlertaDTO> buscarPorNivelUrgencia(String nivelUrgencia, Pageable pageable) {
        return alertaRepository.findByNivelUrgencia(nivelUrgencia, pageable)
            .map(alerta -> modelMapper.map(alerta, AlertaDTO.class));
    }
    
    public Page<AlertaDTO> buscarPorFonte(String fonte, Pageable pageable) {
        return alertaRepository.findByFonte(fonte, pageable)
            .map(alerta -> modelMapper.map(alerta, AlertaDTO.class));
    }
    
    public Optional<AlertaDTO> buscarPorId(Long id) {
        return alertaRepository.findById(id)
            .map(alerta -> modelMapper.map(alerta, AlertaDTO.class));
    }
    
    public void deletarAlerta(Long id) {
        if (!alertaRepository.existsById(id)) {
            throw new RuntimeException("Alerta não encontrado");
        }
        alertaRepository.deleteById(id);
    }

    public Page<AlertaDTO> buscarAlertasAtivos(Pageable pageable) {
        throw new UnsupportedOperationException("Unimplemented method 'buscarAlertasAtivos'");
    }

    public AlertaDTO atualizarStatus(Long id, String status) {
        throw new UnsupportedOperationException("Unimplemented method 'atualizarStatus'");
    }
}