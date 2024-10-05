package com.mainak.GhostWrite.repository;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import com.mainak.GhostWrite.models.Posts;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Component
public class PostSearchRepositoryImpl implements PostSearchRepository {

    @Autowired
    MongoClient mongoClient;

    @Autowired
    MongoConverter converter;

    @Override
    public List<Posts> findByKeyword(String keyword) {

        List<Posts> posts = new ArrayList<>();

        MongoDatabase database = mongoClient.getDatabase("ghostwriter");
        MongoCollection<Document> collection = database.getCollection("posts");

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                new Document("index", "ghostwriter-search-index")
                        .append("text",
                                new Document("query", keyword)
                                        .append("path", Arrays.asList("title", "category", "content", "identifier")))),
                new Document("$sort",
                        new Document("creationTime", -1L))));

        result.forEach(doc -> posts.add(converter.read(Posts.class, doc)));
        return posts;
    }

}
