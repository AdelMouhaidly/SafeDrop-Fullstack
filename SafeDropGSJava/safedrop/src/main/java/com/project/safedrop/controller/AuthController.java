package com.project.safedrop.controller;

import com.project.safedrop.dto.LoginDTO;
import com.project.safedrop.dto.UsuarioDTO;
import com.project.safedrop.dto.UsuarioRegistroDTO;
import com.project.safedrop.service.AuthService;
import com.project.safedrop.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticação", description = "Endpoints para autenticação e registro")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @PostMapping("/login")
    @Operation(summary = "Realizar login", description = "Autentica um usuário e retorna um token JWT")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            String token = authService.autenticar(loginDTO);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Credenciais inválidas"));
        }
    }
    
    @PostMapping("/registro")
    @Operation(summary = "Registrar usuário", description = "Registra um novo usuário no sistema")
    public ResponseEntity<?> registrar(@Valid @RequestBody UsuarioRegistroDTO registroDTO) {
        try {
            UsuarioDTO usuario = usuarioService.registrarUsuario(registroDTO);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            System.err.println("Erro de runtime: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        } catch (Exception e) {
            System.err.println("Erro geral: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("erro", "Erro interno do servidor: " + e.getMessage()));
        }
    }
}