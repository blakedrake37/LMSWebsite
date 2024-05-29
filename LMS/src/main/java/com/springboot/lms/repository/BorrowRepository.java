package com.springboot.lms.repository;

import com.springboot.lms.model.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowRepository extends JpaRepository<Borrow, Long>{
}
