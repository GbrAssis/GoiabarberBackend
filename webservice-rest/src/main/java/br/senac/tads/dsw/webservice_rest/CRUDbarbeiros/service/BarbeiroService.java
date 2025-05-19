package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.service;

import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.model.Barbeiro;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.repository.BarbeiroRepository;
import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.dto.BarbeiroDTO;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service("crudBarbeiroService")
public class BarbeiroService {

    private static final Logger logger = LoggerFactory.getLogger(BarbeiroService.class);
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
        try {
            logger.info("Buscando todos os barbeiros do repositório");
            List<Barbeiro> barbeiros = repository.findAll();
            logger.info("Encontrados {} barbeiros no banco", barbeiros.size());
            
            List<BarbeiroDTO> dtos = new ArrayList<>();
            for (Barbeiro b : barbeiros) {
                try {
                    BarbeiroDTO dto = new BarbeiroDTO();
                    dto.setId(b.getId());
                    dto.setName(b.getName());
                    dto.setSpecialty(b.getSpecialty());
                    dto.setImage(b.getImage());
                    dto.setRating(b.getRating());
                    dto.setAvailableDays(b.getAvailableDays());
                    dtos.add(dto);
                    logger.debug("Convertido barbeiro: {}", b.getName());
                } catch (Exception e) {
                    logger.error("Erro ao converter barbeiro para DTO: {}", b.getName(), e);
                }
            }
            logger.info("Convertidos {} barbeiros para DTOs", dtos.size());
            return dtos;
        } catch (Exception e) {
            logger.error("Erro ao listar barbeiros com dias disponíveis", e);
            throw new RuntimeException("Erro ao buscar barbeiros", e);
        }
    }
}

