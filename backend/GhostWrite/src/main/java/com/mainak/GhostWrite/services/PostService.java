package com.mainak.GhostWrite.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mainak.GhostWrite.error.PostError;
import com.mainak.GhostWrite.models.Posts;
import com.mainak.GhostWrite.repository.PostRepository;
import com.mainak.GhostWrite.repository.PostSearchRepositoryImpl;

@Service
public class PostService {
    @Autowired
    PostRepository repo;

    @Autowired
    PostSearchRepositoryImpl searchRepo;

    // Get all posts
    public ResponseEntity<List<Posts>> getAllPosts() {
        List<Posts> posts = repo.findAll();
        if (posts.isEmpty()) {
            throw new PostError(404, "No posts found!");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(posts);
        }
    }

    // Get a single post
    public ResponseEntity<Posts> getPost(String id) throws RuntimeException {
        Posts post = repo.findById(id).orElseThrow(() -> new PostError(404, "Post not found!"));

        return ResponseEntity.status(HttpStatus.OK).body(post);
    }

    // Save a post
    public ResponseEntity<Posts> savePost(Posts newPost) throws RuntimeException {
        newPost.setCreationTime(LocalDateTime.now()); // creationTime added
        Posts post = repo.save(newPost);
        if (post == null)
            throw new PostError(400, "Post can't be saved!");
        else {
            return ResponseEntity.status(HttpStatus.OK).body(post);
        }
    }

    // Save all posts (only for dev)
    public ResponseEntity<List<Posts>> savePosts(List<Posts> newPosts) {
        // Adding the creation time as the current time before saving the data
        List<Posts> posts = newPosts.stream()
                .map(post -> {
                    post.setCreationTime(LocalDateTime.now());
                    return post; // Return the modified post
                })
                .collect(Collectors.toList());
        posts = repo.saveAll(posts);
        if (posts.isEmpty())
            throw new PostError(400, "Posts can't be saved!");
        else {
            return ResponseEntity.status(HttpStatus.OK).body(posts);
        }
    }

    // Update stars for a particular post.
    public ResponseEntity<Posts> updateStars(String id) {
        Posts post = repo.findById(id).orElseThrow(() -> new PostError(400, "Can't find the post!"));

        post.setStars(post.getStars() + 1);
        post = repo.save(post);
        if (post == null) {
            throw new PostError(400, "Can't add stars!");
        } else {
            return ResponseEntity.status(200).body(post);
        }
    }

    // Search the posts using a keyword/text
    public ResponseEntity<List<Posts>> searchPosts(String keyword) {

        List<Posts> posts = searchRepo.findByKeyword(keyword);

        if (posts.isEmpty()) {
            return ResponseEntity.status(200).body(null);
        } else {
            return ResponseEntity.status(200).body(posts);
        }
    }
}
