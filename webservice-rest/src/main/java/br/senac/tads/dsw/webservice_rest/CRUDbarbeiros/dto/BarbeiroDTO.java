package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.dto;

import java.util.List;

public class BarbeiroDTO {
    private Long id;
    private String name;
    private String specialty;
    private String image;
    private Double rating;
    private List<Integer> availableDays;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }
    
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public List<Integer> getAvailableDays() {
        return availableDays;
    }

    public void setAvailableDays(List<Integer> availableDays) {
        this.availableDays = availableDays;
    }

}