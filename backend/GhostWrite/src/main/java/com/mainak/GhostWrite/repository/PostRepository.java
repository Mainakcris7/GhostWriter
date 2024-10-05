package com.mainak.GhostWrite.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mainak.GhostWrite.models.Posts;
import java.util.List;

public interface PostRepository extends MongoRepository<Posts, String> {

    List<Posts> findByCategory(String category);

}
