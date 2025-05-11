package br.senac.tads.dsw.webservice_rest.CRUD.controller;

import br.senac.tads.dsw.webservice_rest.CRUD.model.Servico;
import br.senac.tads.dsw.webservice_rest.CRUD.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoRepository servicoRepository;

    @GetMapping
    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarPorId(@PathVariable Long id) {
        Optional<Servico> servico = servicoRepository.findById(id);
        return servico.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Servico> criar(@RequestBody Servico servico) {
        Servico novo = servicoRepository.save(servico);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> atualizar(@PathVariable Long id, @RequestBody Servico servicoAtualizado) {
        return servicoRepository.findById(id)
                .map(servico -> {
                    servico.setName(servicoAtualizado.getName());
                    servico.setDescription(servicoAtualizado.getDescription());
                    servico.setDuration(servicoAtualizado.getDuration());
                    servico.setPrice(servicoAtualizado.getPrice());
                    servico.setOriginalPrice(servicoAtualizado.getOriginalPrice());
                    servico.setDiscount(servicoAtualizado.getDiscount());
                    servico.setImage(servicoAtualizado.getImage());
                    servico.setCategory(servicoAtualizado.getCategory());
                    servico.setBadge(servicoAtualizado.getBadge());
                    servicoRepository.save(servico);
                    return ResponseEntity.ok(servico);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (servicoRepository.existsById(id)) {
            servicoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

