package com.usp.buildconnect.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.usp.buildconnect.dto.UserProfileDTO;
import com.usp.buildconnect.entity.User;
import com.usp.buildconnect.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public UserProfileDTO getAuthenticatedUser() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o email: " + username));

		return new UserProfileDTO(user);
	}

	public void deleteUser(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User Not Found"));
		userRepository.delete(user);
	}
}
