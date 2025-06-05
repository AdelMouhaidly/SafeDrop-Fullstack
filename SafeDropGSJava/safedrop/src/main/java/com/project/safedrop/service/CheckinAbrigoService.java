package com.project.safedrop.service;

import com.project.safedrop.dto.CheckinAbrigoDTO;
import com.project.safedrop.entity.Abrigo;
import com.project.safedrop.entity.CheckinAbrigo;
import com.project.safedrop.entity.Usuario;
import com.project.safedrop.repository.AbrigoRepository;
import com.project.safedrop.repository.CheckinAbrigoRepository;
import com.project.safedrop.repository.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CheckinAbrigoService {
    
    @Autowired
    private CheckinAbrigoRepository checkinAbrigoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private AbrigoRepository abrigoRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public CheckinAbrigoDTO realizarCheckin(CheckinAbrigoDTO checkinDTO) {
        Usuario usuario = usuarioRepository.findById(checkinDTO.getUsuarioId())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        Abrigo abrigo = abrigoRepository.findById(checkinDTO.getAbrigoId())
            .orElseThrow(() -> new RuntimeException("Abrigo não encontrado"));

        if (abrigo.getVagasDisponiveis() <= 0) {
            throw new RuntimeException("Abrigo sem vagas disponíveis");
        }

        Optional<CheckinAbrigo> checkinAtivo = checkinAbrigoRepository.findByUsuarioAndDataSaidaIsNull(usuario);
        if (checkinAtivo.isPresent()) {
            throw new RuntimeException("Usuário já possui check-in ativo");
        }
        
        CheckinAbrigo checkin = new CheckinAbrigo();
        checkin.setUsuario(usuario);
        checkin.setAbrigo(abrigo);
        checkin.setDataEntrada(LocalDateTime.now());
        abrigo.setVagasDisponiveis(abrigo.getVagasDisponiveis() - 1);
        if (abrigo.getVagasDisponiveis() <= 0) {
            abrigo.setStatus("lotado");
        }
        abrigoRepository.save(abrigo);
        
        CheckinAbrigo checkinSalvo = checkinAbrigoRepository.save(checkin);
        return modelMapper.map(checkinSalvo, CheckinAbrigoDTO.class);
    }
    
    public CheckinAbrigoDTO realizarCheckout(Long checkinId) {
        CheckinAbrigo checkin = checkinAbrigoRepository.findById(checkinId)
            .orElseThrow(() -> new RuntimeException("Check-in não encontrado"));
        
        if (checkin.getDataSaida() != null) {
            throw new RuntimeException("Check-out já realizado");
        }
        
        checkin.setDataSaida(LocalDateTime.now());

        Abrigo abrigo = checkin.getAbrigo();
        abrigo.setVagasDisponiveis(abrigo.getVagasDisponiveis() + 1);
        if (abrigo.getVagasDisponiveis() > 0 && "lotado".equals(abrigo.getStatus())) {
            abrigo.setStatus("disponivel");
        }
        abrigoRepository.save(abrigo);
        
        CheckinAbrigo checkinAtualizado = checkinAbrigoRepository.save(checkin);
        return modelMapper.map(checkinAtualizado, CheckinAbrigoDTO.class);
    }
    
    public Page<CheckinAbrigoDTO> listarCheckins(Pageable pageable) {
        return checkinAbrigoRepository.findAll(pageable)
            .map(checkin -> modelMapper.map(checkin, CheckinAbrigoDTO.class));
    }
    
    public Page<CheckinAbrigoDTO> buscarPorAbrigo(Long abrigoId, Pageable pageable) {
        return checkinAbrigoRepository.findByAbrigoIdAbrigo(abrigoId, pageable)
            .map(checkin -> modelMapper.map(checkin, CheckinAbrigoDTO.class));
    }
    
    public Page<CheckinAbrigoDTO> buscarPorUsuario(Long usuarioId, Pageable pageable) {
        return checkinAbrigoRepository.findByUsuarioIdUsuario(usuarioId, pageable)
            .map(checkin -> modelMapper.map(checkin, CheckinAbrigoDTO.class));
    }
    
    public Optional<CheckinAbrigoDTO> buscarPorId(Long id) {
        return checkinAbrigoRepository.findById(id)
            .map(checkin -> modelMapper.map(checkin, CheckinAbrigoDTO.class));
    }
}