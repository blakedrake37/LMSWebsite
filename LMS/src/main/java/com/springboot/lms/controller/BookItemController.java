package com.springboot.lms.controller;

import com.springboot.lms.model.BookItem;
import com.springboot.lms.model.BorrowDetail;
import com.springboot.lms.service.BookItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class BookItemController {
    private BookItemService bookItemService;

    public BookItemController(BookItemService bookItemService) {
        this.bookItemService = bookItemService;
    }
    @PostMapping("/bookItems")
    public ResponseEntity<BookItem> saveBookItem(@RequestBody BookItem bookItem) {
        bookItem.setStatus(0);
        return new ResponseEntity<BookItem>(bookItemService.save(bookItem), org.springframework.http.HttpStatus.CREATED);
    }
    @GetMapping("/bookItems")
    public List<BookItem> getAllBookItems() {
        return bookItemService.getAllBookItems();
    }
    @GetMapping("/bookItems/{id}")
    public ResponseEntity<BookItem> getBookItemByID(@PathVariable("id") long id) {
        return new ResponseEntity<BookItem>(bookItemService.getBookItemById(id), org.springframework.http.HttpStatus.OK);
    }
    @PutMapping("/bookItems/{id}")
    public ResponseEntity<BookItem> updateBookItem(@PathVariable("id") long id, @RequestBody BookItem bookItem) {
        return new ResponseEntity<BookItem>(bookItemService.updateBookItem(id,bookItem), org.springframework.http.HttpStatus.OK);
    }
    @DeleteMapping("/bookItems/{id}")
    public ResponseEntity<String> deleteBookItem(@PathVariable("id") long id) {
        bookItemService.deleteBookItem(id);
        return new ResponseEntity<String>("BookItem deleted successfully", org.springframework.http.HttpStatus.OK);
    }
}
