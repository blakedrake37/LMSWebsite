package com.springboot.lms.service;

import com.springboot.lms.model.BorrowDetail;

import java.util.List;

public interface BorrowDetailService {
    BorrowDetail saveBorrowDetail(BorrowDetail borrowDetail);
    List<BorrowDetail> getAllBorrowDetails();
    BorrowDetail updateBorrowDetail(long id, BorrowDetail borrowDetail);
    BorrowDetail getBorrowDetailbyID(Long id);
    void deleteBorrowDetail(Long id);

}
