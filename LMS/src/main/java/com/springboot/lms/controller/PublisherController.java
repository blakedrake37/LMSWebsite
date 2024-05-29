package com.springboot.lms.controller;

import com.springboot.lms.model.Publisher;
import com.springboot.lms.service.PublisherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class PublisherController {

    private PublisherService publisherService;

    public PublisherController(PublisherService publisherService) {
        this.publisherService = publisherService;
    }

    @PostMapping("/publishers")
    public ResponseEntity<Publisher> savePublisher(@RequestBody Publisher publisher) {
        return new ResponseEntity<Publisher>(publisherService.savePublisher(publisher), org.springframework.http.HttpStatus.CREATED);
    }
    @GetMapping("/publishers")
    public List<Publisher> getAllPublishers() {
        return publisherService.getAllPublishers();
    }
    @GetMapping("/publishers/{id}")
    public ResponseEntity<Publisher> getPublisherByID(@PathVariable("id") long id) {
        return new ResponseEntity<Publisher>(publisherService.getPublisherByID(id), org.springframework.http.HttpStatus.OK);
    }
    @PutMapping("/publishers/{id}")
    public ResponseEntity<Publisher> updatePublisher(@PathVariable("id") long id, @RequestBody Publisher publisher) {
        return new ResponseEntity<Publisher>(publisherService.updatePublisher(id, publisher), org.springframework.http.HttpStatus.OK);
    }
    @DeleteMapping("/publishers/{id}")
    public ResponseEntity<String> deletePublisher(@PathVariable("id") long id) {
        publisherService.deletePublisher(id);
        return new ResponseEntity<String>("Publisher deleted successfully", org.springframework.http.HttpStatus.OK);
    }
}
