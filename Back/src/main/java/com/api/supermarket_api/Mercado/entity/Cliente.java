package com.api.supermarket_api.Mercado.entity;

import javax.persistence.*;

//Entidade Clinte
@Entity
@Table(name = "cliente")
public class Cliente {
    //Declaração da chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id; 

    //Declaração da coluna nome
    @Column(name = "nome")
    private String nome;

    //Declaração da coluna
    @Column(name = "codigo") 
    private String codigo;

    //Getters and Setters
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
