package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.controller;


import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.model.Barbeiro;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.service.BarbeiroService;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.dto.BarbeiroDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbeiros")
@CrossOrigin(origins = "*")
public class BarbeiroController {

    private final BarbeiroService service;

    public BarbeiroController(BarbeiroService service) {
        this.service = service;
    }

    @GetMapping
    public List<BarbeiroDTO> listar() {
        return service.listarTodosComDiasDisponiveis();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbeiro> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Barbeiro> criar(@RequestBody Barbeiro barbeiro) {
        return ResponseEntity.ok(service.salvar(barbeiro));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Barbeiro> atualizar(@PathVariable Long id, @RequestBody Barbeiro dados) {
        return service.buscarPorId(id).map(b -> {
            b.setName(dados.getName());
            b.setSpecialty(dados.getSpecialty());
            return ResponseEntity.ok(service.salvar(b));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (service.buscarPorId(id).isPresent()) {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

