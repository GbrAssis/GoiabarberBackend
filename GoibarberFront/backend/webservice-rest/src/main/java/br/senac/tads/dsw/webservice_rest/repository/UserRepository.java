package br.senac.tads.dsw.webservice_rest.repository;

import br.senac.tads.dsw.webservice_rest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
