package com.springboot.lms.service;

import com.springboot.lms.model.BookItem;
import com.springboot.lms.model.BorrowDetail;

import java.util.List;

public interface BookItemService {
    BookItem save(BookItem bookItem);
    List<BookItem> getAllBookItems();
    BookItem updateBookItem(long id, BookItem bookItem);
    BookItem getBookItemById(Long bookItemId);
    void deleteBookItem(Long bookItemId);
}
