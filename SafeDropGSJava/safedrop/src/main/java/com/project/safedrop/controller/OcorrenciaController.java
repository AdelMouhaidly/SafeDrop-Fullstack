package com.project.safedrop.controller;

import com.project.safedrop.dto.OcorrenciaDTO;
import com.project.safedrop.service.OcorrenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.project.safedrop.dto.TipoOcorrenciaDTO;

@RestController
@RequestMapping("/api/ocorrencias")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Ocorrências", description = "Endpoints para gerenciamento de ocorrências")
public class OcorrenciaController {
    
    @Autowired
    private OcorrenciaService ocorrenciaService;
    
    @PostMapping
    @Operation(summary = "Criar ocorrência", description = "Cria uma nova ocorrência")
    public ResponseEntity<OcorrenciaDTO> criarOcorrencia(@Valid @RequestBody OcorrenciaDTO ocorrenciaDTO) {
        try {
            OcorrenciaDTO ocorrencia = ocorrenciaService.criarOcorrencia(ocorrenciaDTO);
            return ResponseEntity.ok(ocorrencia);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    @Operation(summary = "Listar ocorrências", description = "Lista todas as ocorrências com paginação")
    public ResponseEntity<Page<OcorrenciaDTO>> listarOcorrencias(Pageable pageable) {
        Page<OcorrenciaDTO> ocorrencias = ocorrenciaService.listarOcorrencias(pageable);
        return ResponseEntity.ok(ocorrencias);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Buscar por status", description = "Busca ocorrências por status")
    public ResponseEntity<Page<OcorrenciaDTO>> buscarPorStatus(@PathVariable String status, Pageable pageable) {
        Page<OcorrenciaDTO> ocorrencias = ocorrenciaService.buscarPorStatus(status, pageable);
        return ResponseEntity.ok(ocorrencias);
    }
    
    @GetMapping("/tipos")
    @Operation(summary = "Listar tipos de ocorrência", description = "Lista todos os tipos de ocorrência disponíveis")
    public ResponseEntity<List<TipoOcorrenciaDTO>> listarTipos() {
        List<TipoOcorrenciaDTO> tipos = ocorrenciaService.listarTipos();
        return ResponseEntity.ok(tipos);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Buscar ocorrência por ID", description = "Busca uma ocorrência específica pelo ID")
    public ResponseEntity<OcorrenciaDTO> buscarPorId(@PathVariable Long id) {
        return ocorrenciaService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}/status")
    @Operation(summary = "Atualizar status", description = "Atualiza o status de uma ocorrência")
    public ResponseEntity<OcorrenciaDTO> atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            OcorrenciaDTO ocorrencia = ocorrenciaService.atualizarStatus(id, status);
            return ResponseEntity.ok(ocorrencia);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar ocorrência", description = "Atualiza uma ocorrência existente")
    public ResponseEntity<OcorrenciaDTO> atualizarOcorrencia(@PathVariable Long id, @Valid @RequestBody OcorrenciaDTO ocorrenciaDTO) {
        try {
            OcorrenciaDTO ocorrencia = ocorrenciaService.atualizarOcorrencia(id, ocorrenciaDTO);
            return ResponseEntity.ok(ocorrencia);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar ocorrência", description = "Remove uma ocorrência do sistema")
    public ResponseEntity<Void> deletarOcorrencia(@PathVariable Long id) {
        try {
            ocorrenciaService.deletarOcorrencia(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}