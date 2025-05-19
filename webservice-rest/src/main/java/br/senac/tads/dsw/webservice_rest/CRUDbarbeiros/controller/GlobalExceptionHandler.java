package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataAccessException;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        logger.error("Erro não esperado: ", e);
        return ResponseEntity.internalServerError()
            .body("Erro interno do servidor: " + e.getMessage());
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> handleDataAccessException(DataAccessException e) {
        logger.error("Erro de acesso aos dados: ", e);
        return ResponseEntity.internalServerError()
            .body("Erro ao acessar o banco de dados: " + e.getMessage());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException e) {
        logger.error("Entidade não encontrada: ", e);
        return ResponseEntity.notFound()
            .build();
    }
} 