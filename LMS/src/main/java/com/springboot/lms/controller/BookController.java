package com.springboot.lms.controller;

import com.springboot.lms.model.Book;
import com.springboot.lms.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class BookController {
    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    @PostMapping("/books")
    public ResponseEntity<Book> saveBook(@RequestBody Book book) {
        return new ResponseEntity<Book>(bookService.saveBook(book), org.springframework.http.HttpStatus.CREATED);
    }
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookByID(@PathVariable("id") long id) {
        return new ResponseEntity<Book>(bookService.getBookById(id), org.springframework.http.HttpStatus.OK);
    }
    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") long id, @RequestBody Book book) {
        return new ResponseEntity<Book>(bookService.updateBook(id,book), org.springframework.http.HttpStatus.OK);
    }
    @DeleteMapping("/books/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<String>("Book deleted successfully", org.springframework.http.HttpStatus.OK);
    }
}
