package com.project.safedrop.controller;

import com.project.safedrop.dto.AbrigoDTO;
import com.project.safedrop.service.AbrigoService;
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
@RequestMapping("/api/abrigos")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Abrigos", description = "Endpoints para gerenciamento de abrigos")
public class AbrigoController {
    
    @Autowired
    private AbrigoService abrigoService;
    
    @PostMapping
    @Operation(summary = "Criar abrigo", description = "Cria um novo abrigo")
    public ResponseEntity<AbrigoDTO> criarAbrigo(@Valid @RequestBody AbrigoDTO abrigoDTO) {
        try {
            AbrigoDTO abrigo = abrigoService.criarAbrigo(abrigoDTO);
            return ResponseEntity.ok(abrigo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    @Operation(summary = "Listar abrigos", description = "Lista todos os abrigos com paginação")
    public ResponseEntity<Page<AbrigoDTO>> listarAbrigos(Pageable pageable) {
        Page<AbrigoDTO> abrigos = abrigoService.listarAbrigos(pageable);
        return ResponseEntity.ok(abrigos);
    }
    
    @GetMapping("/ativos")
    @Operation(summary = "Buscar abrigos ativos", description = "Busca abrigos por status ativo")
    public ResponseEntity<Page<AbrigoDTO>> buscarPorAtivo(@RequestParam Boolean ativo, Pageable pageable) {
        Page<AbrigoDTO> abrigos = abrigoService.buscarPorAtivo(ativo, pageable);
        return ResponseEntity.ok(abrigos);
    }
    
    @GetMapping("/com-vagas")
    @Operation(summary = "Buscar abrigos com vagas", description = "Busca abrigos que possuem vagas disponíveis")
    public ResponseEntity<Page<AbrigoDTO>> buscarComVagas(Pageable pageable) {
        Page<AbrigoDTO> abrigos = abrigoService.buscarComVagas(pageable);
        return ResponseEntity.ok(abrigos);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Buscar abrigo por ID", description = "Busca um abrigo específico pelo ID")
    public ResponseEntity<AbrigoDTO> buscarPorId(@PathVariable Long id) {
        return abrigoService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar abrigo", description = "Atualiza os dados de um abrigo")
    public ResponseEntity<AbrigoDTO> atualizarAbrigo(@PathVariable Long id, @Valid @RequestBody AbrigoDTO abrigoDTO) {
        try {
            AbrigoDTO abrigoAtualizado = abrigoService.atualizarAbrigo(id, abrigoDTO);
            return ResponseEntity.ok(abrigoAtualizado);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/ocupacao")
    @Operation(summary = "Atualizar ocupação", description = "Atualiza a ocupação atual do abrigo")
    public ResponseEntity<AbrigoDTO> atualizarOcupacao(@PathVariable Long id, @RequestParam Integer ocupacao) {
        try {
            AbrigoDTO abrigo = abrigoService.atualizarOcupacao(id, ocupacao);
            return ResponseEntity.ok(abrigo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar abrigo", description = "Remove um abrigo do sistema")
    public ResponseEntity<Void> deletarAbrigo(@PathVariable Long id) {
        try {
            abrigoService.deletarAbrigo(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}