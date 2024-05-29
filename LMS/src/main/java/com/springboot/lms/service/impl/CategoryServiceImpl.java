package com.springboot.lms.service.impl;

import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Category;
import com.springboot.lms.repository.CategoryRepository;
import com.springboot.lms.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryByID(long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category is not exists with given id: "+ id));
    }

    @Override
    public Category updateCategory(long id, Category category) {
        Category categoryData = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category is not exists with given id: "+ id));
        if(category.getCategoryName() != null)
            categoryData.setCategoryName(category.getCategoryName());
        return categoryRepository.save(categoryData);
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category is not exists with given id: "+ id));
        categoryRepository.deleteById(id);
    }
}
