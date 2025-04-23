package br.senac.tads.dsw.webservice_rest.controller;

import br.senac.tads.dsw.webservice_rest.dto.LoginRequest;
import br.senac.tads.dsw.webservice_rest.dto.LoginResponse;
import br.senac.tads.dsw.webservice_rest.model.User;
import br.senac.tads.dsw.webservice_rest.repository.UserRepository;
import br.senac.tads.dsw.webservice_rest.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/login")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("Iniciando o processo de login para o email: " + request.getEmail());
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            System.out.println("Usuário encontrado: " + userOpt.get().getEmail());
            if (userOpt.get().getSenha().equals(request.getSenha())) {
                User user = userOpt.get();
                String token = jwtUtil.generateToken(user);
                System.out.println("Token gerado com sucesso para o usuário: " + user.getEmail());

                LoginResponse response = new LoginResponse();
                response.setToken(token);
                response.setNome(user.getNome());
                response.setEmail(user.getEmail());
                response.setTipo(user.getTipo());

                return ResponseEntity.ok(response);
            } else {
                System.out.println("Senha incorreta para o usuário: " + userOpt.get().getEmail());
            }
        } else {
            System.out.println("Usuário não encontrado para o email: " + request.getEmail());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
}
