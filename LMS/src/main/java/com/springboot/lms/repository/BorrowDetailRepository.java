package com.springboot.lms.repository;

import com.springboot.lms.model.BorrowDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowDetailRepository extends JpaRepository<BorrowDetail, Long> {
}
