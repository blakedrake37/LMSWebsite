package com.springboot.lms.service;


import com.springboot.lms.model.Borrow;

import java.util.List;

public interface BorrowService {
    Borrow save(Borrow borrowDto);
    List<Borrow> findAll();
    Borrow findById(long id);
    void delete(long id);
    Borrow update(long id, Borrow borrowDto);
}
