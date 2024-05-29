package com.springboot.lms.service;


import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Account;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface AccountService {
    Account saveAccount(Account account);
    List<Account> getAllAccounts();
    Account getAccountByID(long id);
    Account updateAccount(long id, Account Account);
    void deleteAccount(long id);
    boolean isUsernameExists(String username);
    boolean isEmailExists(String email);
    UserDetails loadUserByUsername(String username);
    public Account removeBorrowFromAccount(long accountId, long borrowId);
    public Account findAccountProfileByJwt(String jwt) throws ResourceNotFoundException;
}
