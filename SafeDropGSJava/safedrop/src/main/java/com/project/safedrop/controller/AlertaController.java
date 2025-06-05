package com.project.safedrop.controller;

import com.project.safedrop.dto.AlertaDTO;
import com.project.safedrop.service.AlertaService;
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
@RequestMapping("/api/alertas")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Alertas", description = "Endpoints para gerenciamento de alertas")
public class AlertaController {
    
    @Autowired
    private AlertaService alertaService;
    
    @PostMapping
    @Operation(summary = "Criar alerta", description = "Cria um novo alerta")
    public ResponseEntity<AlertaDTO> criarAlerta(@Valid @RequestBody AlertaDTO alertaDTO) {
        try {
            AlertaDTO alerta = alertaService.criarAlerta(alertaDTO);
            return ResponseEntity.ok(alerta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    @Operation(summary = "Listar alertas", description = "Lista todos os alertas com paginação")
    public ResponseEntity<Page<AlertaDTO>> listarAlertas(Pageable pageable) {
        Page<AlertaDTO> alertas = alertaService.listarAlertas(pageable);
        return ResponseEntity.ok(alertas);
    }
    
    @GetMapping("/tipo/{tipo}")
    @Operation(summary = "Buscar alertas por tipo", description = "Busca alertas por tipo específico")
    public ResponseEntity<Page<AlertaDTO>> buscarPorTipo(@PathVariable String tipo, Pageable pageable) {
        Page<AlertaDTO> alertas = alertaService.buscarPorFonte(tipo, pageable);
        return ResponseEntity.ok(alertas);
    }
    
    @GetMapping("/prioridade/{prioridade}")
    @Operation(summary = "Buscar alertas por prioridade", description = "Busca alertas por nível de prioridade")
    public ResponseEntity<Page<AlertaDTO>> buscarPorPrioridade(@PathVariable String prioridade, Pageable pageable) {
        Page<AlertaDTO> alertas = alertaService.buscarPorFonte(prioridade, pageable);
        return ResponseEntity.ok(alertas);
    }
    
    @GetMapping("/ativos")
    @Operation(summary = "Buscar alertas ativos", description = "Busca alertas que estão ativos")
    public ResponseEntity<Page<AlertaDTO>> buscarAlertasAtivos(Pageable pageable) {
        Page<AlertaDTO> alertas = alertaService.buscarAlertasAtivos(pageable);
        return ResponseEntity.ok(alertas);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Buscar alerta por ID", description = "Busca um alerta específico pelo ID")
    public ResponseEntity<AlertaDTO> buscarPorId(@PathVariable Long id) {
        return alertaService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/status")
    @Operation(summary = "Atualizar status do alerta", description = "Atualiza o status de um alerta")
    public ResponseEntity<AlertaDTO> atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            AlertaDTO alertaAtualizado = alertaService.atualizarStatus(id, status);
            return ResponseEntity.ok(alertaAtualizado);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}