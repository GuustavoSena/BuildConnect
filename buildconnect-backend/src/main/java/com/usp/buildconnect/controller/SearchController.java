package com.usp.buildconnect.controller;

import com.usp.buildconnect.dto.PostCardDTO;
import com.usp.buildconnect.services.PostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private PostsService postsService;

    @GetMapping
    public ResponseEntity<Page<PostCardDTO>> search(@RequestParam(name = "query", required = false) String query,
            Pageable pageable) {
        Page<PostCardDTO> results = postsService.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}