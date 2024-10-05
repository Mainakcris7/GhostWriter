package com.mainak.GhostWrite.error;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PostErrorHandler {

    @ExceptionHandler(PostError.class)
    public ResponseEntity<Map<String, String>> throwError(PostError err) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("statusCode", String.valueOf(err.getStatusCode()));
        errorMap.put("message", err.getErrorMessage());
        return ResponseEntity.status(err.getStatusCode()).body(errorMap);
    }
}
