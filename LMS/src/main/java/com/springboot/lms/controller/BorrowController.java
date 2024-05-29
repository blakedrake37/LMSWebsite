package com.springboot.lms.controller;


import com.springboot.lms.model.Borrow;
import com.springboot.lms.service.BorrowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class BorrowController {
    private BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }
    @PostMapping("/borrows")
    public ResponseEntity<Borrow> saveBorrow(@RequestBody Borrow borrowDto) {
        return new ResponseEntity<Borrow>(borrowService.save(borrowDto), org.springframework.http.HttpStatus.CREATED);
    }
    @GetMapping("/borrows")
    public List<Borrow> getAllBorrows() {
        return borrowService.findAll();
    }
    @GetMapping("/borrows/{id}")
    public ResponseEntity<Borrow> getBorrowByID(@PathVariable("id") long id) {
        return new ResponseEntity<Borrow>(borrowService.findById(id), org.springframework.http.HttpStatus.OK);
    }
    @PutMapping("/borrows/{id}")
    public ResponseEntity<Borrow> updateBorrow(@PathVariable("id") long id,@RequestBody Borrow borrowDto) {
        return new ResponseEntity<Borrow>(borrowService.update(id,borrowDto), org.springframework.http.HttpStatus.OK);
    }
    @DeleteMapping("/borrows/{id}")
    public ResponseEntity<String> deleteBorrow(@PathVariable("id") long id) {
        borrowService.delete(id);
        return new ResponseEntity<String>("Borrow deleted successfully", org.springframework.http.HttpStatus.OK);
    }
}
