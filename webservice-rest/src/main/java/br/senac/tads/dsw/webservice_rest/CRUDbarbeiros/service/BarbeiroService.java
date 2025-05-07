package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.service;



import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.model.Barbeiro;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.repository.BarbeiroRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarbeiroService {

    private final BarbeiroRepository repository;

    public BarbeiroService(BarbeiroRepository repository) {
        this.repository = repository;
    }

    public List<Barbeiro> listarTodos() {
        return repository.findAll();
    }

    public Optional<Barbeiro> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Barbeiro salvar(Barbeiro barbeiro) {
        return repository.save(barbeiro);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}

