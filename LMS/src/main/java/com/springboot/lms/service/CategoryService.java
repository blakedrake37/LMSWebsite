package com.springboot.lms.service;


import com.springboot.lms.model.Category;

import java.util.List;

public interface CategoryService {
    Category saveCategory(Category category);
    List<Category> getAllCategories();
    Category getCategoryByID(long id);
    Category updateCategory(long id, Category category);
    void deleteCategory(long id);
}
