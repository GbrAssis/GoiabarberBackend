package br.senac.tads.dsw.webservice_rest.admin.service;

import br.senac.tads.dsw.webservice_rest.admin.model.Barbeiro;
import br.senac.tads.dsw.webservice_rest.admin.repository.BarbeiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarbeiroService {

    @Autowired
    private BarbeiroRepository barbeiroRepository;

    public List<Barbeiro> findAll() {
        return barbeiroRepository.findAll();
    }

    public Optional<Barbeiro> findById(Long id) {
        return barbeiroRepository.findById(id);
    }

    public Barbeiro save(Barbeiro barbeiro) {
        return barbeiroRepository.save(barbeiro);
    }

    public void deleteById(Long id) {
        barbeiroRepository.deleteById(id);
    }
}
