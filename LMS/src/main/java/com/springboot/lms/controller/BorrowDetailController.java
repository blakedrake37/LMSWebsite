package com.springboot.lms.controller;

import com.springboot.lms.model.BorrowDetail;
import com.springboot.lms.service.BorrowDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class BorrowDetailController {
    private BorrowDetailService borrowDetailService;

    public BorrowDetailController(BorrowDetailService borrowDetailService) {
        this.borrowDetailService = borrowDetailService;
    }
    @PostMapping("/borrowDetails")
    public ResponseEntity<BorrowDetail> saveBorrowDetail(@RequestBody BorrowDetail borrowDetail) {
        return new ResponseEntity<BorrowDetail>(borrowDetailService.saveBorrowDetail(borrowDetail), org.springframework.http.HttpStatus.CREATED);
    }
    @GetMapping("/borrowDetails")
    public List<BorrowDetail> getAllBorrowDetails() {
        return borrowDetailService.getAllBorrowDetails();
    }
    @GetMapping("/borrowDetails/{id}")
    public ResponseEntity<BorrowDetail> getBorrowDetailByID(@PathVariable("id") long id) {
        return new ResponseEntity<BorrowDetail>(borrowDetailService.getBorrowDetailbyID(id), org.springframework.http.HttpStatus.OK);
    }
    @PutMapping("/borrowDetails/{id}")
    public ResponseEntity<BorrowDetail> updateBorrowDetail(@PathVariable("id") long id,@RequestBody BorrowDetail borrowDetail) {
        return new ResponseEntity<BorrowDetail>(borrowDetailService.updateBorrowDetail(id,borrowDetail), org.springframework.http.HttpStatus.OK);
    }
    @DeleteMapping("/borrowDetails/{id}")
    public ResponseEntity<String> deleteBorrowDetail(@PathVariable("id") long id) {
        borrowDetailService.deleteBorrowDetail(id);
        return new ResponseEntity<String>("BorrowDetail deleted successfully", org.springframework.http.HttpStatus.OK);
    }
}
