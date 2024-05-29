package com.springboot.lms.controller;


import com.springboot.lms.model.Category;
import com.springboot.lms.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/")
public class CategoryController {
    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @PostMapping("/categories")
    private ResponseEntity<Category> saveCategory(@RequestBody Category category) {
        return new ResponseEntity<Category>(categoryService.saveCategory(category), org.springframework.http.HttpStatus.CREATED);
    }
    @GetMapping("/categories")
    private List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
    @GetMapping("/categories/{id}")
    private ResponseEntity<Category> getCategoryByID(@PathVariable("id") long id) {
        return new ResponseEntity<Category>(categoryService.getCategoryByID(id), org.springframework.http.HttpStatus.OK);
    }
    @PutMapping("/categories/{id}")
    private ResponseEntity<Category> updateCategory(@PathVariable("id") long id,@RequestBody Category category) {
        return new ResponseEntity<Category>(categoryService.updateCategory(id, category), org.springframework.http.HttpStatus.OK);
    }
    @DeleteMapping("/categories/{id}")
    private ResponseEntity<String> deleteCategory(@PathVariable("id") long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<String>("Category deleted successfully", org.springframework.http.HttpStatus.OK);
    }
}
