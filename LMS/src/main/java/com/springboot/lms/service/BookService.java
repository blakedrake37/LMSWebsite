package com.springboot.lms.service;

import com.springboot.lms.model.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookService {
    Book saveBook(Book book);

    List<Book> getAllBooks();

    Book getBookById(Long bookId);

    Book updateBook(Long id, Book book);

    void deleteBook(Long bookId);

}

