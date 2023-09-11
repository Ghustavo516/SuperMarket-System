package com.api.supermarket_api.Mercado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.api.supermarket_api.Mercado.entity.Produto;
import com.api.supermarket_api.Mercado.repository.ProdutoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/produto")
@CrossOrigin(origins = "http://localhost:4200")
public class ProdutoController {

    private final ProdutoRepository productRepository;
    
    @Autowired
    public ProdutoController(ProdutoRepository productRepository){
        this.productRepository = productRepository;
    }

    @GetMapping
    //Obter os dados de todos os clientes
    public List<Produto> getAllProduto(){
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    //Obter os dados de um cliente pelo id
    public Produto getProdutoById(@PathVariable Long id){
        return productRepository.findById(id).get();
    }

    @PostMapping
    //Inserir dados dentro de um cliente
    public Produto saveProduto(@RequestBody Produto produto){
        return productRepository.save(produto);
    }

    @PutMapping("/{id}")
    //Atualizar dados de um cliente pelo id
    public Produto updateProduto(@PathVariable Long id, @RequestBody Produto produto){
        Produto produtoExistente = productRepository.findById(id).get(); //Obter os dados pelo id
        produtoExistente.setCodicoProduto(produto.getCodicoProduto());
        produtoExistente.setDescricao(produto.getDescricao());
        produtoExistente.setValorUnitario(produto.getValorUnitario());
        return productRepository.save(produtoExistente);
    }

    @DeleteMapping("/{id}")
    //Deletar um cliente pelo id
    public String deleteProduto(@PathVariable Long id){
        try {
            productRepository.findById(id).get();
            productRepository.deleteById(id);
            return "Produto deletado com sucesso";
        } catch (Exception e) {
            return "Produto não encontrado";  
        }
    }   
}
