package com.example.projeto.controller;

import com.example.projeto.model.Cliente;
import com.example.projeto.model.Hotel;
import com.example.projeto.repository.ClienteRepository;
import com.example.projeto.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // Hotéis
    @GetMapping("/hoteis")
    public List<Hotel> getAllHoteis() {
        return hotelRepository.findAll();
    }

    @PostMapping("/hoteis")
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @PutMapping("/hoteis/{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotelDetails) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow();
        hotel.setNome(hotelDetails.getNome());
        hotel.setEndereco(hotelDetails.getEndereco());
        hotel.setEstrelas(hotelDetails.getEstrelas());
        return hotelRepository.save(hotel);
    }

    @DeleteMapping("/hoteis/{id}")
    public void deleteHotel(@PathVariable Long id) {
        hotelRepository.deleteById(id);
    }

    // Clientes
    @GetMapping("/clientes")
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping("/clientes")
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @PutMapping("/clientes/{id}")
    public Cliente updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow();
        cliente.setNome(clienteDetails.getNome());
        cliente.setEmail(clienteDetails.getEmail());
        cliente.setTelefone(clienteDetails.getTelefone());
        return clienteRepository.save(cliente);
    }

    @DeleteMapping("/clientes/{id}")
    public void deleteCliente(@PathVariable Long id) {
        clienteRepository.deleteById(id);
    }
}
