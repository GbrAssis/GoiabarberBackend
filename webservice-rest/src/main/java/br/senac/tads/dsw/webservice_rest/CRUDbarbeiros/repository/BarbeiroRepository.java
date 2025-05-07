package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.repository;

import br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.model.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BarbeiroRepository extends JpaRepository<Barbeiro, Long> {
}