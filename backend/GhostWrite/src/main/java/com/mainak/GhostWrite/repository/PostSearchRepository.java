package com.mainak.GhostWrite.repository;

import com.mainak.GhostWrite.models.Posts;
import java.util.List;

public interface PostSearchRepository {
    List<Posts> findByKeyword(String keyword);
}
