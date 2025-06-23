package com.usp.buildconnect.controller;

import com.usp.buildconnect.dto.ServicoDTO;
import com.usp.buildconnect.services.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public ResponseEntity<List<ServicoDTO>> findAll() {
        List<ServicoDTO> servicos = servicoService.findAll();
        return ResponseEntity.ok(servicos);
    }
}