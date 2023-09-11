package com.api.supermarket_api.Mercado.entity;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "itensNota")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class ItensNota {
    //Declaração da chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Declaração da coluna totalNota
    @Column(name = "itensSequenciais")
    private Integer itensSequenciais;

    //Criando relacionamento ManyToOne para produtos
    @ManyToOne()
    @JoinColumn(name = "produto_id")
    private Produto produto;

    //Declaração da coluna quantProdutos
    @Column(name = "quantProdutos")
    private BigDecimal quantProdutos;

    //Declaração da coluna valorTotal
    @Column(name = "valorTotal")
    private BigDecimal valorTotal;

    //Relacionamento ItensNota - Notas
    @ManyToOne(cascade = CascadeType.ALL)
    private NotaFiscal nota;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getItensSequenciais() {
        return this.itensSequenciais;
    }

    public void setItensSequenciais(Integer itensSequenciais) {
        this.itensSequenciais = itensSequenciais;
    }

    public Produto getProduto() {
        return this.produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public BigDecimal getQuantProdutos() {
        return this.quantProdutos;
    }

    public void setQuantProdutos(BigDecimal quantProdutos) {
        this.quantProdutos = quantProdutos;
    }

    public BigDecimal getValorTotal() {
        return this.valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public NotaFiscal getNota() {
        return this.nota;
    }

    public void setNota(NotaFiscal nota) {
        this.nota = nota;
    }
}
