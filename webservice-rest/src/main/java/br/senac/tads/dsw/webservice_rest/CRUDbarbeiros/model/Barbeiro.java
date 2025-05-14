package br.senac.tads.dsw.webservice_rest.CRUDbarbeiros.model;

import jakarta.persistence.*;

@Table(name = "barbers")
@Entity
public class Barbeiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String specialty;

    private String image;

    private Double rating;

    @ElementCollection
    @CollectionTable(
        name = "barber_available_days",
        joinColumns = @JoinColumn(name = "barber_id")
    )
    @Column(name = "day_of_week")
    private java.util.List<Integer> availableDays;

    public Barbeiro() {
    }

    public Barbeiro(String name, String specialty, String image, Double rating, java.util.List<Integer> availableDays) {
        this.name = name;
        this.specialty = specialty;
        this.image = image;
        this.rating = rating;
        this.availableDays = availableDays;
    }

    public Long getId() {
        return id;
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

    public java.util.List<Integer> getAvailableDays() {
        return availableDays;
    }

    public void setAvailableDays(java.util.List<Integer> availableDays) {
        this.availableDays = availableDays;
    }
}