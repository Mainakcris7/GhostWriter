package com.mainak.GhostWrite.models;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Posts {
    private String _id;
    private String title;
    private String category;
    private String content;
    private String identifier;
    private LocalDateTime creationTime;
    private int stars;
}
