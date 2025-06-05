package com.project.safedrop.service;

import com.project.safedrop.dto.OcorrenciaDTO;
import com.project.safedrop.entity.Ocorrencia;
import com.project.safedrop.entity.TipoOcorrencia;
import com.project.safedrop.entity.Usuario;
import com.project.safedrop.repository.OcorrenciaRepository;
import com.project.safedrop.repository.TipoOcorrenciaRepository;
import com.project.safedrop.repository.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;
import java.util.List;
import com.project.safedrop.dto.TipoOcorrenciaDTO;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OcorrenciaService {
    
    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private TipoOcorrenciaRepository tipoOcorrenciaRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public OcorrenciaDTO criarOcorrencia(OcorrenciaDTO ocorrenciaDTO) {
        Usuario usuario = null;
        if (ocorrenciaDTO.getIdUsuario() != null) {
            usuario = usuarioRepository.findById(ocorrenciaDTO.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        }
        
        TipoOcorrencia tipoOcorrencia = tipoOcorrenciaRepository.findById(ocorrenciaDTO.getIdTipo())
            .orElseThrow(() -> new RuntimeException("Tipo de ocorrência não encontrado"));
        
        Ocorrencia ocorrencia = new Ocorrencia();
        if (usuario != null) {
            ocorrencia.setUsuario(usuario);
        }
        ocorrencia.setTipoOcorrencia(tipoOcorrencia);
        ocorrencia.setDescricao(ocorrenciaDTO.getDescricao());
        ocorrencia.setLatitude(ocorrenciaDTO.getLatitude());
        ocorrencia.setLongitude(ocorrenciaDTO.getLongitude());
        ocorrencia.setDataOcorrencia(ocorrenciaDTO.getDataOcorrencia() != null ? 
            ocorrenciaDTO.getDataOcorrencia() : LocalDateTime.now());
        ocorrencia.setNivelRisco(ocorrenciaDTO.getNivelRisco());
        ocorrencia.setStatus(ocorrenciaDTO.getStatus() != null ? 
            ocorrenciaDTO.getStatus() : "em andamento");
        
        Ocorrencia ocorrenciaSalva = ocorrenciaRepository.save(ocorrencia);

        OcorrenciaDTO resultado = new OcorrenciaDTO();
        resultado.setIdOcorrencia(ocorrenciaSalva.getIdOcorrencia());
        if (ocorrenciaSalva.getUsuario() != null) {
            resultado.setIdUsuario(ocorrenciaSalva.getUsuario().getIdUsuario());
            resultado.setNomeUsuario(ocorrenciaSalva.getUsuario().getNome());
        }
        resultado.setIdTipo(ocorrenciaSalva.getTipoOcorrencia().getIdTipo());
        resultado.setNomeTipo(ocorrenciaSalva.getTipoOcorrencia().getNome());
        resultado.setDescricao(ocorrenciaSalva.getDescricao());
        resultado.setLatitude(ocorrenciaSalva.getLatitude());
        resultado.setLongitude(ocorrenciaSalva.getLongitude());
        resultado.setDataOcorrencia(ocorrenciaSalva.getDataOcorrencia());
        resultado.setNivelRisco(ocorrenciaSalva.getNivelRisco());
        resultado.setStatus(ocorrenciaSalva.getStatus());
        
        return resultado;
    }
    
    public Page<OcorrenciaDTO> listarOcorrencias(Pageable pageable) {
        return ocorrenciaRepository.findAll(pageable)
            .map(ocorrencia -> modelMapper.map(ocorrencia, OcorrenciaDTO.class));
    }
    
    public Page<OcorrenciaDTO> buscarPorStatus(String status, Pageable pageable) {
        return ocorrenciaRepository.findByStatus(status, pageable)
            .map(ocorrencia -> modelMapper.map(ocorrencia, OcorrenciaDTO.class));
    }
    
    public Page<OcorrenciaDTO> buscarPorNivelRisco(String nivelRisco, Pageable pageable) {
        return ocorrenciaRepository.findByNivelRisco(nivelRisco, pageable)
            .map(ocorrencia -> modelMapper.map(ocorrencia, OcorrenciaDTO.class));
    }
    
    public Page<OcorrenciaDTO> buscarPorTipo(Long idTipo, Pageable pageable) {
        return ocorrenciaRepository.findByTipoOcorrenciaIdTipo(idTipo, pageable)
            .map(ocorrencia -> modelMapper.map(ocorrencia, OcorrenciaDTO.class));
    }
    
    public Optional<OcorrenciaDTO> buscarPorId(Long id) {
        return ocorrenciaRepository.findById(id)
            .map(ocorrencia -> modelMapper.map(ocorrencia, OcorrenciaDTO.class));
    }
    
    public OcorrenciaDTO atualizarStatus(Long id, String novoStatus) {
        Ocorrencia ocorrencia = ocorrenciaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ocorrência não encontrada"));
        
        ocorrencia.setStatus(novoStatus);
        Ocorrencia ocorrenciaAtualizada = ocorrenciaRepository.save(ocorrencia);
        return modelMapper.map(ocorrenciaAtualizada, OcorrenciaDTO.class);
    }
    
    public void deletarOcorrencia(Long id) {
        if (!ocorrenciaRepository.existsById(id)) {
            throw new RuntimeException("Ocorrência não encontrada");
        }
        ocorrenciaRepository.deleteById(id);
    }
    
    public List<TipoOcorrenciaDTO> listarTipos() {
        List<TipoOcorrencia> tipos = tipoOcorrenciaRepository.findAll();
        return tipos.stream()
            .map(tipo -> new TipoOcorrenciaDTO(tipo.getIdTipo(), tipo.getNome()))
            .collect(Collectors.toList());
    }

    public OcorrenciaDTO atualizarOcorrencia(Long id, OcorrenciaDTO ocorrenciaDTO) {
        Ocorrencia ocorrenciaExistente = ocorrenciaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ocorrência não encontrada com ID: " + id));

        if (ocorrenciaDTO.getIdUsuario() != null) {
            Usuario usuario = usuarioRepository.findById(ocorrenciaDTO.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            ocorrenciaExistente.setUsuario(usuario);
        }

        if (ocorrenciaDTO.getIdTipo() != null) {
            TipoOcorrencia tipoOcorrencia = tipoOcorrenciaRepository.findById(ocorrenciaDTO.getIdTipo())
                .orElseThrow(() -> new RuntimeException("Tipo de ocorrência não encontrado"));
            ocorrenciaExistente.setTipoOcorrencia(tipoOcorrencia);
        }

        if (ocorrenciaDTO.getDescricao() != null) {
            ocorrenciaExistente.setDescricao(ocorrenciaDTO.getDescricao());
        }
        
        if (ocorrenciaDTO.getLatitude() != null) {
            ocorrenciaExistente.setLatitude(ocorrenciaDTO.getLatitude());
        }
        
        if (ocorrenciaDTO.getLongitude() != null) {
            ocorrenciaExistente.setLongitude(ocorrenciaDTO.getLongitude());
        }
        
        if (ocorrenciaDTO.getDataOcorrencia() != null) {
            ocorrenciaExistente.setDataOcorrencia(ocorrenciaDTO.getDataOcorrencia());
        }
        
        if (ocorrenciaDTO.getNivelRisco() != null) {
            ocorrenciaExistente.setNivelRisco(ocorrenciaDTO.getNivelRisco());
        }
        
        if (ocorrenciaDTO.getStatus() != null) {
            ocorrenciaExistente.setStatus(ocorrenciaDTO.getStatus());
        }
        
        Ocorrencia ocorrenciaAtualizada = ocorrenciaRepository.save(ocorrenciaExistente);

        return modelMapper.map(ocorrenciaAtualizada, OcorrenciaDTO.class);
    }
}