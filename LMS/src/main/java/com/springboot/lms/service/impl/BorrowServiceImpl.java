package com.springboot.lms.service.impl;

import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Account;
import com.springboot.lms.model.Borrow;
import com.springboot.lms.repository.AccountRepository;
import com.springboot.lms.repository.BookItemRepository;
import com.springboot.lms.repository.BorrowDetailRepository;
import com.springboot.lms.repository.BorrowRepository;
import com.springboot.lms.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BorrowServiceImpl implements BorrowService {
    private BorrowRepository borrowRepository;
    private BookItemRepository bookItemRepository;
    private BorrowDetailRepository borrowDetailRepository;
    private AccountRepository accountRepository;
    @Autowired
    public BorrowServiceImpl(BorrowRepository borrowRepository, BookItemRepository bookItemRepository, BorrowDetailRepository borrowDetailRepository, AccountRepository accountRepository) {
        this.borrowRepository = borrowRepository;
        this.bookItemRepository = bookItemRepository;
        this.borrowDetailRepository = borrowDetailRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public Borrow save(Borrow borrow) {
        Account account = accountRepository.findById(borrow.getAccountID()).orElseThrow(() -> new ResourceNotFoundException("Account is not exists with given id: "+ borrow.getAccountID()));
        borrow.setAccountID(account.getAccountID());
        borrow.setFine(0);
        return borrowRepository.save(borrow);
    }

    @Override
    public List<Borrow> findAll() {
        return borrowRepository.findAll();
    }

    @Override
    public Borrow findById(long id) {
        return borrowRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Borrow is not exists with given id: "+ id));
    }

    @Override
    public void delete(long id) {
        Borrow borrow = borrowRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Borrow is not exists with given id: "+ id));
        borrowRepository.deleteById(id);
    }

    @Override
    public Borrow update(long id, Borrow borrowDto) {
        Borrow borrowData = borrowRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Borrow is not exists with given id: "+ borrowDto.getBorrowId()));
        if(borrowDto.getBorrowDate() != null)
            borrowData.setBorrowDate(borrowDto.getBorrowDate());
        if(borrowDto.getReturnDate() != null)
            borrowData.setReturnDate(borrowDto.getReturnDate());
        if(borrowDto.getFine() >0)
            borrowData.setFine(borrowDto.getFine());
        return borrowRepository.save(borrowData);
    }
}
