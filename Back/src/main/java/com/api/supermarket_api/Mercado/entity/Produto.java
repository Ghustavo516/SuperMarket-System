package com.api.supermarket_api.Mercado.entity;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
//Entidade Produtos
@Entity
@Table(name = "produto")
public class Produto {
    //Declaração da chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    //Declaração da coluna codicoProduto
    @Column(name = "codicoProduto")
    private String codicoProduto;

    //Declaração da coluna descricao
    @Column(name = "descricao")
    private String descricao;

    //Declaração da coluna valorUnitario
    @Column(name = "valorUnitario")
    private BigDecimal valorUnitario;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodicoProduto() {
        return this.codicoProduto;
    }

    public void setCodicoProduto(String codicoProduto) {
        this.codicoProduto = codicoProduto;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValorUnitario() {
        return this.valorUnitario;
    }

    public void setValorUnitario(BigDecimal valorUnitario) {
        this.valorUnitario = valorUnitario;
    }
}
