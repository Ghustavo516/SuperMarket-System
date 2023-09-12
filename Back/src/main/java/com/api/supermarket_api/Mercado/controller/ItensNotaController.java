package com.api.supermarket_api.Mercado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.supermarket_api.Mercado.entity.ItensNota;
import com.api.supermarket_api.Mercado.entity.NotaFiscal;
import com.api.supermarket_api.Mercado.entity.Produto;
import com.api.supermarket_api.Mercado.repository.ItensNotaRepository;
import com.api.supermarket_api.Mercado.repository.NotaFiscalRepository;
import com.api.supermarket_api.Mercado.repository.ProdutoRepository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ItensNotaController {

    @Autowired
    private ItensNotaRepository itensNotaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private NotaFiscalRepository notaFiscalRepository;

    @GetMapping("/itensNota")
    //Obter os dados de todos os clientes
    public List<ItensNota> getAllItens(){
        return itensNotaRepository.findAll();
    }

    //@GetMapping("/api/cliente/{id}")
    @GetMapping("/{id}")
    //Obter os dados de um cliente pelo id
    public ResponseEntity<ItensNota> getNotaFiscalById(@PathVariable Long id) {
        Optional<ItensNota> itensNota = itensNotaRepository.findById(id);
        return itensNota.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/itensNota")
    @ResponseStatus(HttpStatus.CREATED)
    public ItensNota createItensNota(@RequestBody ItensNota itensNota) {
        // Certifique-se de que o produto e a nota fiscal associados existem no banco de dados
        Optional<Produto> produtoOptional = produtoRepository.findById(itensNota.getProduto().getId());
        Optional<NotaFiscal> notaFiscalOptional = notaFiscalRepository.findById(itensNota.getNota().getId());

        if (produtoOptional.isPresent() && notaFiscalOptional.isPresent()) {
            Produto produto = produtoOptional.get();
            NotaFiscal notaFiscal = notaFiscalOptional.get();

            itensNota.setProduto(produto);
            itensNota.setNota(notaFiscal);

            return itensNotaRepository.save(itensNota);
        } else {
            throw new EntityNotFoundException("Produto ou Nota Fiscal não encontrado");
        }
    }


    @PutMapping("/itensNota/{id}")
    public ResponseEntity<ItensNota> updateItensNota(@PathVariable Long id, @RequestBody ItensNota itensNota) {
        Optional<ItensNota> existingItensNota = itensNotaRepository.findById(id);
        if (existingItensNota.isPresent()) {
            ItensNota updatedItensNota = existingItensNota.get();
            updatedItensNota.setItensSequenciais(itensNota.getItensSequenciais());
            updatedItensNota.setQuantProdutos(itensNota.getQuantProdutos());
            updatedItensNota.setValorTotal(itensNota.getValorTotal());
            //itensExistente.setProduto(itensNota.getProduto());
            
            // Certifique-se de que o cliente associado existe no banco de dados
            Optional<Produto> produto = produtoRepository.findById(itensNota.getProduto().getId());
            Optional<NotaFiscal> notaFiscal = notaFiscalRepository.findById(itensNota.getNota().getId());

            if (!produto.isPresent()) {
                throw new RuntimeException("Produto não encontrado");
            }

            if (!notaFiscal.isPresent()) {
                throw new RuntimeException("Nota Fiscal não encontrado");
            }

            updatedItensNota.setProduto(produto.get());
            updatedItensNota.setNota(notaFiscal.get());
            return ResponseEntity.ok(itensNotaRepository.save(updatedItensNota));
    
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/itensNota/{id}")
    public ResponseEntity<String> deleteItensNota(@PathVariable Long id) {
        Optional<ItensNota> itensNota = itensNotaRepository.findById(id);
        if (itensNota.isPresent()) {
            itensNotaRepository.delete(itensNota.get());
            return ResponseEntity.ok("Nota Fiscal deletada com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
