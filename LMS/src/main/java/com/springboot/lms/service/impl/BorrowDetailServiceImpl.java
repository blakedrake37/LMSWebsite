package com.springboot.lms.service.impl;

import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Account;
import com.springboot.lms.model.BookItem;
import com.springboot.lms.model.Borrow;
import com.springboot.lms.model.BorrowDetail;
import com.springboot.lms.repository.AccountRepository;
import com.springboot.lms.repository.BookItemRepository;
import com.springboot.lms.repository.BorrowDetailRepository;
import com.springboot.lms.repository.BorrowRepository;
import com.springboot.lms.service.BorrowDetailService;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Service
public class BorrowDetailServiceImpl implements BorrowDetailService {
    private BorrowDetailRepository borrowDetailRepository;
    private BookItemRepository bookItemRepository;
    private BorrowRepository borrowRepository;
    private AccountRepository accountRepository;

    public BorrowDetailServiceImpl(BorrowDetailRepository borrowDetailRepository, BookItemRepository bookItemRepository, BorrowRepository borrowRepository, AccountRepository accountRepository) {
        this.borrowDetailRepository = borrowDetailRepository;
        this.bookItemRepository = bookItemRepository;
        this.borrowRepository = borrowRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public BorrowDetail saveBorrowDetail(BorrowDetail borrowDetail) {
        BookItem bookItem = bookItemRepository.findById(borrowDetail.getBookItem().getBookItemId()).orElseThrow(() -> new ResourceNotFoundException("BookItem is not exists with given id: "+ borrowDetail.getBookItem().getBookItemId()));
        Borrow borrow = borrowRepository.findById(borrowDetail.getBorrow().getBorrowId()).orElseThrow(() -> new ResourceNotFoundException("Borrow is not exists with given id: "+ borrowDetail.getBorrow().getBorrowId()));
        borrowDetail.setBookItem(bookItem);
//        Date currentDate = new Date();
//        borrow.setBorrowDate(currentDate);
        borrowDetail.setBorrow(borrow);
        borrowDetail.setStatus(0);
        return borrowDetailRepository.save(borrowDetail);
    }

    @Override
    public List<BorrowDetail> getAllBorrowDetails() {
        return borrowDetailRepository.findAll();
    }

    @Override
    public BorrowDetail updateBorrowDetail(long id, BorrowDetail borrowDetail1) {
        BorrowDetail borrowDetail = borrowDetailRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BorrowDetail is not exists with given id: "+ borrowDetail1.getBorrowDetailId()));
        if(borrowDetail1.getStatus() != borrowDetail.getStatus())
            borrowDetail.setStatus(borrowDetail1.getStatus());
        return borrowDetailRepository.save(borrowDetail);
    }

    @Override
    public BorrowDetail getBorrowDetailbyID(Long id) {
        return borrowDetailRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BorrowDetail is not exists with given id: "+ id));
    }

    @Override
    public void deleteBorrowDetail(Long id) {
        BorrowDetail borrowDetail = borrowDetailRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BorrowDetail is not exists with given id: "+ id));
        Borrow borrow = borrowDetail.getBorrow();
        Account account = accountRepository.findById(borrow.getAccountID()).orElseThrow(()-> new ResourceNotFoundException("Account is not exists with given id: "+ borrow.getAccountID()));
        account.getBorrow().remove(borrow);
        borrowDetail.setBookItem(null);
        borrowRepository.deleteById(borrow.getBorrowId());
        borrowDetailRepository.deleteById(id);
    }
}
