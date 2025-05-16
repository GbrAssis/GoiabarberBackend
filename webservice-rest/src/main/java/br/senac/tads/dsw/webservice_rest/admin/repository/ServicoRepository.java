package br.senac.tads.dsw.webservice_rest.admin.repository;

import br.senac.tads.dsw.webservice_rest.admin.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {}
