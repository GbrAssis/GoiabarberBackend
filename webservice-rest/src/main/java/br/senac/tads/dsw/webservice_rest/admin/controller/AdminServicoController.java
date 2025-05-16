package br.senac.tads.dsw.webservice_rest.admin.controller;

import br.senac.tads.dsw.webservice_rest.admin.model.Servico;
import br.senac.tads.dsw.webservice_rest.admin.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/servicos")
public class AdminServicoController {

    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public List<Servico> listar() {
        return servicoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarPorId(@PathVariable Long id) {
        Optional<Servico> servico = servicoService.findById(id);
        return servico.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Servico criar(@RequestBody Servico servico) {
        return servicoService.save(servico);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> atualizar(@PathVariable Long id, @RequestBody Servico servicoDetalhes) {
        Optional<Servico> servico = servicoService.findById(id);

        if (!servico.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Servico s = servico.get();
        s.setNome(servicoDetalhes.getNome());
        s.setDescricao(servicoDetalhes.getDescricao());
        s.setPreco(servicoDetalhes.getPreco());

        Servico atualizado = servicoService.save(s);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        servicoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
