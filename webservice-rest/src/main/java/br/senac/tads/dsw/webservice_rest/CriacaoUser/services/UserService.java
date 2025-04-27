package br.senac.tads.dsw.webservice_rest.CriacaoUser.services;

import br.senac.tads.dsw.webservice_rest.CriacaoUser.model.User;
import br.senac.tads.dsw.webservice_rest.CriacaoUser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
