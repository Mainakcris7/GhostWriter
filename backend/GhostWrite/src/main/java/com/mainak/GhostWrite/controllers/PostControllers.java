package com.mainak.GhostWrite.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.mainak.GhostWrite.models.Posts;
import com.mainak.GhostWrite.services.PostService;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin("https://ghostwriter-mainak.onrender.com") // Allows access from the frontend
@RestController
public class PostControllers {

    @Autowired
    PostService service;

    @GetMapping("/")
    public void getMethodName(HttpServletResponse res) throws IOException {
        res.sendRedirect("/swagger-ui.html");
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Posts>> fetchAllPosts() {
        return service.getAllPosts();
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Posts> fetchPostById(@PathVariable String id) {
        return service.getPost(id);
    }

    // Search posts based on a keyword/text
    @GetMapping("/posts/search/{keyword}")
    public ResponseEntity<List<Posts>> searchPosts(@PathVariable String keyword) {
        return service.searchPosts(keyword);
    }

    @PostMapping("/posts")
    public ResponseEntity<Posts> savePost(@RequestBody Posts newPost) {
        return service.savePost(newPost);
    }

    @PostMapping("/posts/save-all")
    public ResponseEntity<List<Posts>> savePost(@RequestBody List<Posts> newPosts) {
        return service.savePosts(newPosts);
    }

    @PutMapping("posts/like/{id}")
    public ResponseEntity<Posts> updateStars(@PathVariable String id) {
        return service.updateStars(id);
    }

}
