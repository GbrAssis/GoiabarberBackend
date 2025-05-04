package br.senac.tads.dsw.webservice_rest.CriacaoUser.controller;

import br.senac.tads.dsw.webservice_rest.CriacaoUser.dto.LoginRequest;
import br.senac.tads.dsw.webservice_rest.CriacaoUser.dto.LoginResponse;
import br.senac.tads.dsw.webservice_rest.CriacaoUser.model.User;
import br.senac.tads.dsw.webservice_rest.CriacaoUser.repository.UserRepository;
import br.senac.tads.dsw.webservice_rest.CriacaoUser.security.JwtUtil;
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

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado");
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setNome(updatedUser.getNome());
            user.setEmail(updatedUser.getEmail());
            user.setSenha(updatedUser.getSenha());
            user.setTipo(updatedUser.getTipo());
            // Adicione outros campos aqui conforme necessário (telefone, nascimento, etc)
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }
}
