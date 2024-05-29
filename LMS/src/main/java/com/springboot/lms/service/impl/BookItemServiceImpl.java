package com.springboot.lms.service.impl;

import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Book;
import com.springboot.lms.model.BookItem;
import com.springboot.lms.repository.BookItemRepository;
import com.springboot.lms.repository.BookRepository;
import com.springboot.lms.service.BookItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookItemServiceImpl implements BookItemService {
    private BookItemRepository bookItemRepository;
    private BookRepository bookRepository;

    public BookItemServiceImpl(BookItemRepository bookItemRepository, BookRepository bookRepository) {
        this.bookItemRepository = bookItemRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public BookItem save(BookItem bookItem) {
        Book book = bookRepository.findById(bookItem.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookItem.getBookId()));
        bookItem.setBookId(book.getBookId());
        return bookItemRepository.save(bookItem);
    }

    @Override
    public List<BookItem> getAllBookItems() {
        return bookItemRepository.findAll();
    }

    @Override
    public BookItem updateBookItem(long id, BookItem bookItem) {
        BookItem bookItemData = bookItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BookItem not found with id: " + bookItem.getBookItemId()));
        if (bookItem.getStatus()!= bookItemData.getStatus())
            bookItemData.setStatus(bookItem.getStatus());
        return bookItemRepository.save(bookItemData);
    }

    @Override
    public BookItem getBookItemById(Long bookItemId) {
        return bookItemRepository.findById(bookItemId).orElseThrow(() -> new ResourceNotFoundException("BookItem is not exists with given id: "+ bookItemId));
    }


    @Override
    public void deleteBookItem(Long bookItemId) {
        bookItemRepository.findById(bookItemId).orElseThrow(() -> new ResourceNotFoundException("BookItem is not exists with given id: "+ bookItemId));
        bookItemRepository.deleteById(bookItemId);
    }
}
