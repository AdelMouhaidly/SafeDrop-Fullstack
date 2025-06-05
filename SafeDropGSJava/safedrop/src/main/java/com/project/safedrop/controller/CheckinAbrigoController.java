package com.project.safedrop.controller;

import com.project.safedrop.dto.CheckinAbrigoDTO;
import com.project.safedrop.service.CheckinAbrigoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkins")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Check-ins", description = "Endpoints para gerenciamento de check-ins em abrigos")
public class CheckinAbrigoController {
    
    @Autowired
    private CheckinAbrigoService checkinAbrigoService;
    
    @PostMapping("/checkin")
    @Operation(summary = "Realizar check-in", description = "Realiza check-in de um usuário em um abrigo")
    public ResponseEntity<CheckinAbrigoDTO> realizarCheckin(@Valid @RequestBody CheckinAbrigoDTO checkinDTO) {
        try {
            CheckinAbrigoDTO checkin = checkinAbrigoService.realizarCheckin(checkinDTO);
            return ResponseEntity.ok(checkin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/checkout/{checkinId}")
    @Operation(summary = "Realizar check-out", description = "Realiza check-out de um usuário de um abrigo")
    public ResponseEntity<CheckinAbrigoDTO> realizarCheckout(@PathVariable Long checkinId) {
        try {
            CheckinAbrigoDTO checkout = checkinAbrigoService.realizarCheckout(checkinId);
            return ResponseEntity.ok(checkout);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping
    @Operation(summary = "Listar check-ins", description = "Lista todos os check-ins com paginação")
    public ResponseEntity<Page<CheckinAbrigoDTO>> listarCheckins(Pageable pageable) {
        Page<CheckinAbrigoDTO> checkins = checkinAbrigoService.listarCheckins(pageable);
        return ResponseEntity.ok(checkins);
    }
    
    @GetMapping("/abrigo/{abrigoId}")
    @Operation(summary = "Buscar check-ins por abrigo", description = "Busca check-ins de um abrigo específico")
    public ResponseEntity<Page<CheckinAbrigoDTO>> buscarPorAbrigo(@PathVariable Long abrigoId, Pageable pageable) {
        Page<CheckinAbrigoDTO> checkins = checkinAbrigoService.buscarPorAbrigo(abrigoId, pageable);
        return ResponseEntity.ok(checkins);
    }
    
    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Buscar check-ins por usuário", description = "Busca check-ins de um usuário específico")
    public ResponseEntity<Page<CheckinAbrigoDTO>> buscarPorUsuario(@PathVariable Long usuarioId, Pageable pageable) {
        Page<CheckinAbrigoDTO> checkins = checkinAbrigoService.buscarPorUsuario(usuarioId, pageable);
        return ResponseEntity.ok(checkins);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Buscar check-in por ID", description = "Busca um check-in específico pelo ID")
    public ResponseEntity<CheckinAbrigoDTO> buscarPorId(@PathVariable Long id) {
        return checkinAbrigoService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}