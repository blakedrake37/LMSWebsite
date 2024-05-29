package com.springboot.lms.service.impl;

import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Book;
import com.springboot.lms.model.Publisher;
import com.springboot.lms.repository.BookRepository;
import com.springboot.lms.repository.PublisherRepository;
import com.springboot.lms.service.BookService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
@Service
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;
    private PublisherRepository publisherRepository;

    public BookServiceImpl(BookRepository bookRepository, PublisherRepository publisherRepository) {
        this.bookRepository = bookRepository;
        this.publisherRepository = publisherRepository;
    }

    @Override
    public Book saveBook(Book book) {
//        book.setPublisher(book.getPublisher());
//        return bookRepository.save(book);
        Publisher publisher = publisherRepository.findById(book.getPublisher().getPublisherId())
                .orElseThrow(() -> new ResourceNotFoundException("Publisher is not exists with given id: "+ book.getPublisher().getPublisherId()));
        book.setPublisher(publisher);
        book.setPublishYear(new Date());
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book is not exists with given id: "+ bookId));
    }

    @Override
    public Book updateBook(Long id, Book book) {
        Book bookData = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book is not exists with given id: "+ book.getBookId()));
        if(book.getTitle() != null)
            bookData.setTitle(book.getTitle());
        if(book.getPublishYear() != null)
            bookData.setPublishYear(book.getPublishYear());
        if(book.getPrice() != null )
            bookData.setPrice(book.getPrice());
        if(book.getDescription()!=null)
            bookData.setDescription(book.getDescription());
        if(book.getPicture()!=null)
            bookData.setPicture(book.getPicture());
        return bookRepository.save(bookData);
    }


    @Override
    public void deleteBook(Long bookId) {
        bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book is not exists with given id: "+ bookId));
        bookRepository.deleteById(bookId);
    }

}
