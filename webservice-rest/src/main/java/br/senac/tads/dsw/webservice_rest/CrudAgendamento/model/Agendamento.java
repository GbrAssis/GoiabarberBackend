package br.senac.tads.dsw.webservice_rest.CrudAgendamento.model;

import br.senac.tads.dsw.webservice_rest.CriacaoUser.model.User;
import br.senac.tads.dsw.webservice_rest.CRUD.model.Servico;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "servico_id")
    private Servico servico;

    private String status; // Ex: "PENDENTE", "CONFIRMADO", "CANCELADO"

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Servico getServico() { return servico; }
    public void setServico(Servico servico) { this.servico = servico; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

