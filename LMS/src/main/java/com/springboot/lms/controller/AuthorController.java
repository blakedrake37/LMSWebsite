package com.springboot.lms.controller;

import com.springboot.lms.model.Author;
import com.springboot.lms.service.AuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class AuthorController {
    private AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }
    @PostMapping("/authors")
    public ResponseEntity<Author> saveAuthor(@RequestBody Author authorDto) {
        return new ResponseEntity<Author>(authorService.saveAuthor(authorDto), org.springframework.http.HttpStatus.CREATED);
    }
    @GetMapping("/authors")
    public ResponseEntity<List<Author>> getAllAuthors() {
        List<Author> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }
    @GetMapping("/authors/{id}")
    public ResponseEntity<Author> getAuthorByID(@PathVariable("id")long id) {
        return new ResponseEntity<Author>(authorService.getAuthorByID(id), org.springframework.http.HttpStatus.OK);
    }
    @PutMapping("/authors/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable("id")long id, @RequestBody Author authorDto) {
        return new ResponseEntity<Author>(authorService.updateAuthor(id, authorDto), org.springframework.http.HttpStatus.OK);
    }
    @DeleteMapping("/authors/{id}")
    public ResponseEntity<String> deleteAuthor(@PathVariable("id") long id) {
        authorService.deleteAuthor(id);
        return new ResponseEntity<String>("Author deleted successfully", org.springframework.http.HttpStatus.OK);
    }
}
