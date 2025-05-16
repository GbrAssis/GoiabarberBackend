package br.senac.tads.dsw.webservice_rest.admin.controller;

import br.senac.tads.dsw.webservice_rest.admin.model.Barbeiro;
import br.senac.tads.dsw.webservice_rest.admin.service.BarbeiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/barbeiros")
public class AdminBarbeiroController {

    @Autowired
    private BarbeiroService barbeiroService;

    @GetMapping
    public List<Barbeiro> listar() {
        return barbeiroService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbeiro> buscarPorId(@PathVariable Long id) {
        Optional<Barbeiro> barbeiro = barbeiroService.findById(id);
        return barbeiro.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Barbeiro criar(@RequestBody Barbeiro barbeiro) {
        return barbeiroService.save(barbeiro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Barbeiro> atualizar(@PathVariable Long id, @RequestBody Barbeiro barbeiroDetalhes) {
        Optional<Barbeiro> barbeiro = barbeiroService.findById(id);

        if (!barbeiro.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Barbeiro b = barbeiro.get();
        b.setNome(barbeiroDetalhes.getNome());
        b.setTelefone(barbeiroDetalhes.getTelefone());
        b.setEspecialidade(barbeiroDetalhes.getEspecialidade());
        b.setAtivo(barbeiroDetalhes.isAtivo());

        Barbeiro atualizado = barbeiroService.save(b);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        barbeiroService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
