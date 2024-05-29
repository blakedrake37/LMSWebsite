package com.springboot.lms.repository;

import com.springboot.lms.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long>{
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Account findByEmail(String email);
}
