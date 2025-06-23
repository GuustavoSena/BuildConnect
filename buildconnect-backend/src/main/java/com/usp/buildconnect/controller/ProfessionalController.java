package com.usp.buildconnect.controller;

import com.usp.buildconnect.dto.ProfessionalProfileDTO;
import com.usp.buildconnect.services.ProfessionalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/professionals")
public class ProfessionalController {

	@Autowired
	private ProfessionalsService professionalsService;

	@GetMapping("/{id}")
	public ResponseEntity<ProfessionalProfileDTO> getProfileById(@PathVariable Long id) {
		ProfessionalProfileDTO profile = professionalsService.findProfileById(id);
		return ResponseEntity.ok(profile);
	}
}