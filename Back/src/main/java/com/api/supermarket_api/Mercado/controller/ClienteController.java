package com.api.supermarket_api.Mercado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.supermarket_api.Mercado.entity.Cliente;
import com.api.supermarket_api.Mercado.repository.ClienteRepository;
import java.util.List;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {

    
    private final ClienteRepository repository;
    
    @Autowired
    public ClienteController(ClienteRepository repository){
        this.repository = repository;
    }

    @GetMapping
    //Obter os dados de todos os clientes
    public List<Cliente> getAllClientes(){
        return repository.findAll();    
    }

    //@GetMapping("/api/cliente/{id}")
    @GetMapping("/{id}")
    //Obter os dados de um cliente pelo id
    public Cliente getClienteById(@PathVariable Long id){
        return repository.findById(id).get();
    }

    @PostMapping
    //Inserir dados dentro de um cliente
    public Cliente saveCliente(@RequestBody Cliente cliente){
        return repository.save(cliente);
    }

    @PutMapping("/{id}")
    //Atualizar dados de um cliente pelo id
    public Cliente updateCliente(@PathVariable Long id, @RequestBody Cliente cliente){
        Cliente clienteExistente = repository.findById(id).get(); //Obter os dados pelo id
        clienteExistente.setNome(cliente.getNome());
        clienteExistente.setCodigo(cliente.getCodigo());
        return repository.save(clienteExistente);
    }

    @DeleteMapping("/{id}")
    //Deletar um cliente pelo id
    public String deleteCliente(@PathVariable Long id){
        try {
            repository.findById(id).get();
            repository.deleteById(id);
            return "Cliente deletado com sucesso";
        } catch (Exception e) {
            return "Cliente não encontrado";  
        }
    }   
}