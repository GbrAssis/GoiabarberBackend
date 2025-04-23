package br.senac.tads.dsw.webservice_rest.CrudAgendamento.controller;

import br.senac.tads.dsw.webservice_rest.CrudAgendamento.model.Agendamento;
import br.senac.tads.dsw.webservice_rest.CrudAgendamento.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        Optional<Agendamento> agendamento = agendamentoRepository.findById(id);
        return agendamento.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Agendamento> criar(@RequestBody Agendamento agendamento) {
        Agendamento novo = agendamentoRepository.save(agendamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> atualizar(@PathVariable Long id, @RequestBody Agendamento atualizado) {
        return agendamentoRepository.findById(id)
                .map(agendamento -> {
                    agendamento.setDataHora(atualizado.getDataHora());
                    agendamento.setServico(atualizado.getServico());
                    agendamento.setUser(atualizado.getUser());
                    agendamento.setStatus(atualizado.getStatus());
                    agendamentoRepository.save(agendamento);
                    return ResponseEntity.ok(agendamento);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (agendamentoRepository.existsById(id)) {
            agendamentoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

