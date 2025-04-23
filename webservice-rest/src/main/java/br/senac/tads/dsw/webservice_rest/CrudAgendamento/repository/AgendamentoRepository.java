package br.senac.tads.dsw.webservice_rest.CrudAgendamento.repository;

import br.senac.tads.dsw.webservice_rest.CrudAgendamento.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
}
