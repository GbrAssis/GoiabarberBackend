package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.controller;

import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.model.Barbeiro;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.service.BarbeiroService;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.dto.BarbeiroDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/barbeiros")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BarbeiroController {

    private static final Logger logger = LoggerFactory.getLogger(BarbeiroController.class);
    private final BarbeiroService service;

    public BarbeiroController(BarbeiroService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<BarbeiroDTO>> listar() {
        try {
            logger.info("Iniciando busca de barbeiros");
            List<BarbeiroDTO> barbeiros = service.listarTodosComDiasDisponiveis();
            logger.info("Encontrados {} barbeiros", barbeiros.size());
            
            if (barbeiros.isEmpty()) {
                logger.warn("Nenhum barbeiro encontrado");
                return ResponseEntity.noContent().build();
            }
            
            return ResponseEntity.ok(barbeiros);
        } catch (Exception e) {
            logger.error("Erro ao buscar barbeiros: ", e);
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbeiro> buscarPorId(@PathVariable Long id) {
        try {
            logger.info("Buscando barbeiro com ID: {}", id);
            return service.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao buscar barbeiro por ID: {}", id, e);
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<Barbeiro> criar(@RequestBody Barbeiro barbeiro) {
        try {
            logger.info("Criando novo barbeiro: {}", barbeiro.getName());
            Barbeiro novo = service.salvar(barbeiro);
            return ResponseEntity.ok(novo);
        } catch (Exception e) {
            logger.error("Erro ao criar barbeiro: ", e);
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Barbeiro> atualizar(@PathVariable Long id, @RequestBody Barbeiro dados) {
        try {
            logger.info("Atualizando barbeiro com ID: {}", id);
            return service.buscarPorId(id)
                .map(b -> {
                    b.setName(dados.getName());
                    b.setSpecialty(dados.getSpecialty());
                    b.setImage(dados.getImage());
                    b.setRating(dados.getRating());
                    b.setAvailableDays(dados.getAvailableDays());
                    return ResponseEntity.ok(service.salvar(b));
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Erro ao atualizar barbeiro: ", e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            logger.info("Deletando barbeiro com ID: {}", id);
            if (service.buscarPorId(id).isPresent()) {
                service.deletar(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Erro ao deletar barbeiro: ", e);
            throw e;
        }
    }
}

