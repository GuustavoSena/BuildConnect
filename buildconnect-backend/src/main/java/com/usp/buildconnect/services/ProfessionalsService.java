package com.usp.buildconnect.services;

import com.usp.buildconnect.dto.ProfessionalProfileDTO;
import com.usp.buildconnect.entity.Professional;
import com.usp.buildconnect.repository.ProfessionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProfessionalsService {

	@Autowired
	private ProfessionalRepository professionalRepository;

	public ProfessionalProfileDTO findProfileById(Long id) {
		Professional professional = professionalRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Profissional não encontrado com o ID: " + id));

		return new ProfessionalProfileDTO(professional);
	}
}