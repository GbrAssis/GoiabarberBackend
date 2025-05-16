package br.senac.tads.dsw.webservice_rest.admin.repository;

import br.senac.tads.dsw.webservice_rest.admin.model.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarbeiroRepository extends JpaRepository<Barbeiro, Long> {}
