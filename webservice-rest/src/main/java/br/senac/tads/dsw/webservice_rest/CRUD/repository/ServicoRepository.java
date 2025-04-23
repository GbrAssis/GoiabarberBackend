package br.senac.tads.dsw.webservice_rest.CRUD.repository;


import br.senac.tads.dsw.webservice_rest.CRUD.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
}

