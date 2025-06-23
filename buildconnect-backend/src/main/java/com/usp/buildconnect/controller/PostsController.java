package com.usp.buildconnect.controller;

import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

// Imports dos DTOs
import com.usp.buildconnect.dto.PostCreateDTO;
import com.usp.buildconnect.dto.PostDTO;
import com.usp.buildconnect.dto.PostUpdateDTO;
import com.usp.buildconnect.dto.PostCardDTO;

import com.usp.buildconnect.entity.Post;
import com.usp.buildconnect.services.PostsService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/posts")
public class PostsController {

	@Autowired
	private PostsService postsService;

	@GetMapping
	public ResponseEntity<Page<PostCardDTO>> buscarTodosOsPosts(Pageable pageable) {
		Page<PostCardDTO> posts = postsService.findAll(pageable);
		return ResponseEntity.ok(posts);
	}

	@GetMapping("/by-professional")
	public ResponseEntity<?> getListPostsByProfessional(@RequestParam("professionalId") Long id) {
		List<PostDTO> list = postsService.getListPostsByProfessional(id);
		return list.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(list);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getPost(@PathVariable("id") Long id) {
		PostDTO dto = postsService.getPost(id);
		return dto == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(dto);
	}

	@PostMapping
	public ResponseEntity<Void> createPost(@RequestBody @Valid PostCreateDTO dto) {
		Post post = postsService.createPost(dto);
		Long id = post.getId();
		return ResponseEntity.created(URI.create("/posts/" + id))
				.build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> updatePost(@PathVariable("id") Long id, @RequestBody @Valid PostUpdateDTO dto) {
		postsService.updatePost(id, dto);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePost(@PathVariable("id") Long id) {
		postsService.deletePost(id);
		return ResponseEntity.noContent().build();
	}
}