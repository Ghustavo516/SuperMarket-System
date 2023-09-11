package com.api.supermarket_api.Mercado.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "notaFiscal")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class NotaFiscal {
    //Declaração da chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Declaração da coluna numeroNota
    @Column(name = "numeroNota")
    private Integer numeroNota;

    //Declaração da coluna dataCompra
    @Column(name = "dataCompra")
    private Date dataCompra;

    //Criando relacionamento para com tabela de cliente
    
    @ManyToOne()
    @JoinColumn(name = "cliente_id") //SE NÃO FUNCIONAR USAR O FOREIGN KEY
    private Cliente cliente;

    //Declaração da coluna totalNota
    @Column(name = "totalNota")
    private BigDecimal totalNota;

    @OneToMany(mappedBy = "nota", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ItensNota> itens;


    public NotaFiscal() {
    }


    public NotaFiscal(Long id, Integer numeroNota, Date dataCompra, Cliente cliente, BigDecimal totalNota, List<ItensNota> itens) {
        this.id = id;
        this.numeroNota = numeroNota;
        this.dataCompra = dataCompra;
        this.cliente = cliente;
        this.totalNota = totalNota;
        this.itens = itens;
    }
    

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumeroNota() {
        return this.numeroNota;
    }

    public void setNumeroNota(Integer numeroNota) {
        this.numeroNota = numeroNota;
    }

    public Date getDataCompra() {
        return this.dataCompra;
    }

    public void setDataCompra(Date dataCompra) {
        this.dataCompra = dataCompra;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public BigDecimal getTotalNota() {
        return this.totalNota;
    }

    public void setTotalNota(BigDecimal totalNota) {
        this.totalNota = totalNota;
    }

    public List<ItensNota> getItens() {
        return this.itens;
    }

    public void setItens(List<ItensNota> itens) {
        this.itens = itens;
    }
}
