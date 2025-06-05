package com.project.safedrop.service;

import com.project.safedrop.dto.UsuarioDTO;
import com.project.safedrop.dto.UsuarioRegistroDTO;
import com.project.safedrop.entity.Usuario;
import com.project.safedrop.repository.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public UsuarioDTO registrarUsuario(UsuarioRegistroDTO registroDTO) {
        if (usuarioRepository.findByEmail(registroDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        Usuario usuario = new Usuario();
        usuario.setNome(registroDTO.getNome());
        usuario.setEmail(registroDTO.getEmail());
        usuario.setSenha(passwordEncoder.encode(registroDTO.getSenha()));
        usuario.setTipoUsuario(registroDTO.getTipoUsuario()); 
        usuario.setDataCadastro(LocalDateTime.now());
        
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        return modelMapper.map(usuarioSalvo, UsuarioDTO.class);
    }
    
    public Page<UsuarioDTO> listarUsuarios(Pageable pageable) {
        return usuarioRepository.findAll(pageable)
            .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class));
    }
    
    public Page<UsuarioDTO> buscarPorTipo(String tipoUsuario, Pageable pageable) {
        return usuarioRepository.findByTipoUsuario(tipoUsuario, pageable)
            .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class));
    }
    
    public Optional<UsuarioDTO> buscarPorId(Long id) {
        return usuarioRepository.findById(id)
            .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class));
    }
    
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    public UsuarioDTO atualizarUsuario(Long id, UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        usuario.setNome(usuarioDTO.getNome());
        usuario.setTipoUsuario(usuarioDTO.getTipoUsuario());
        
        Usuario usuarioAtualizado = usuarioRepository.save(usuario);
        return modelMapper.map(usuarioAtualizado, UsuarioDTO.class);
    }
    
    public void deletarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        usuarioRepository.deleteById(id);
    }
}