package com.example.projeto.controller;

import com.example.projeto.model.Hotel;
import com.example.projeto.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/hoteis")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping
    public String listarHoteis(Model model) {
        List<Hotel> hoteis = hotelRepository.findAll();
        model.addAttribute("hoteis", hoteis);
        return "listar-hoteis";
    }

    @GetMapping("/novo")
    public String mostrarFormHotel(Model model) {
        model.addAttribute("hotel", new Hotel());
        return "cadastrar-hotel";
    }

    @PostMapping
    public String adicionarHotel(@ModelAttribute Hotel hotel) {
        hotelRepository.save(hotel);
        return "redirect:/hoteis";
    }

    @GetMapping("/{id}")
    public String detalhesHotel(@PathVariable("id") Long id, Model model) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null) {
            return "redirect:/hoteis"; // Redireciona para a lista se o hotel não for encontrado
        }
        model.addAttribute("hotel", hotel);
        return "detalhes-hotel"; // Nome da página JSP
    }

    @PostMapping("/{id}")
    public String atualizarHotel(@PathVariable("id") Long id, @ModelAttribute Hotel hotel) {
        hotel.setId(id); // Certifique-se de definir o ID para a atualização correta
        hotelRepository.save(hotel);
        return "redirect:/hoteis";
    }

    @GetMapping("/{id}/editar")
    public String editarHotel(@PathVariable Long id, Model model) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null) {
            return "redirect:/hoteis";
        }
        model.addAttribute("hotel", hotel);
        return "editar-hotel";
    }
}
