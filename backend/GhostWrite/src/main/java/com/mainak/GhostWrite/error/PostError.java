package com.mainak.GhostWrite.error;

import lombok.Getter;

@Getter
public class PostError extends RuntimeException {
    private int statusCode;
    private String errorMessage;

    public PostError(int statusCode, String errorMessage) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
}
