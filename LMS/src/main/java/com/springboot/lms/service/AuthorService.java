package com.springboot.lms.service;

import com.springboot.lms.model.Author;

import java.util.List;

public interface AuthorService {
    Author saveAuthor(Author author);
    List<Author> getAllAuthors();
    Author getAuthorByID(long id);
    Author updateAuthor(long id, Author author);
    void deleteAuthor(long id);

}
