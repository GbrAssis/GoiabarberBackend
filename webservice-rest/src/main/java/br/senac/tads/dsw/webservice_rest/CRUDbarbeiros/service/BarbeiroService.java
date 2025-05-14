package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.service;



import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.model.Barbeiro;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.repository.BarbeiroRepository;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.dto.BarbeiroDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

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

    public List<BarbeiroDTO> listarTodosComDiasDisponiveis() {
        List<Barbeiro> barbeiros = repository.findAll();
        List<BarbeiroDTO> dtos = new ArrayList<>();
        for (Barbeiro b : barbeiros) {
            BarbeiroDTO dto = new BarbeiroDTO();
            dto.setId(b.getId());
            dto.setName(b.getName());
            dto.setSpecialty(b.getSpecialty());
            dto.setImage(b.getImage());
            dto.setRating(b.getRating());
            dto.setAvailableDays(b.getAvailableDays());
            dtos.add(dto);
        }
        return dtos;
    }
}

