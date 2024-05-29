package com.springboot.lms.service.impl;


import com.springboot.lms.config.JwtProvider;
import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Account;
import com.springboot.lms.model.Borrow;
import com.springboot.lms.repository.AccountRepository;
import com.springboot.lms.repository.BorrowRepository;
import com.springboot.lms.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class AccountServiceImpl implements AccountService, UserDetailsService {

    private AccountRepository accountRepository;
    private BorrowRepository borrowRepository;
    private JwtProvider jwtProvider;
    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, BorrowRepository borrowRepository, JwtProvider jwtProvider) {
        this.accountRepository = accountRepository;
        this.borrowRepository = borrowRepository;
        this.jwtProvider = jwtProvider;
    }




    @Override
    public Account saveAccount(Account account) {
        if (isUsernameExists(account.getUsername()) || isEmailExists(account.getEmail())) {
            throw new IllegalArgumentException("Username or Email already exists");
        }
        account.setActive(true);
        return accountRepository.save(account);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountByID(long id) {
        return accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account is not exists with given id: " + id));
    }

    @Override
    public Account updateAccount(long id, Account account) {
        Account accountData = accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account is not exists with given id: " + id));
        if(account.getUsername() != null && !account.getUsername().equals(accountData.getUsername()) && isUsernameExists(account.getUsername()))
            throw new IllegalArgumentException("Username already exists");
        if(account.getEmail() != null && !account.getEmail().equals(accountData.getEmail()) && isEmailExists(account.getEmail()))
            throw new IllegalArgumentException("Email already exists");
        if(account.getUsername() != null)
            accountData.setUsername(account.getUsername());
        if(account.getPassword() != null)
            accountData.setPassword(account.getPassword());
        if(account.getEmail() != null)
            accountData.setEmail(account.getEmail());
        if(account.getPhoneNum() != null)
            accountData.setPhoneNum(account.getPhoneNum());
        if (-1<account.getRole() && account.getRole()<2)
            accountData.setRole(account.getRole());
        if(account.getActive() != null)
            accountData.setActive(account.getActive());
        return accountRepository.save(accountData);
    }

    @Override
    public void deleteAccount(long id) {
        Account accountData = accountRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account is not exists with given id: " + id));
        accountData.setActive(false);
        accountRepository.save(accountData);
    }

    @Override
    public boolean isUsernameExists(String username) {
        return accountRepository.existsByUsername(username);
    }

    @Override
    public boolean isEmailExists(String email) {
        return accountRepository.existsByEmail(email);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByEmail(username);
        if (account == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        List<GrantedAuthority> authorities=new ArrayList<>();
        return new User(account.getUsername(), account.getPassword(), authorities);
    }

    @Override
    public Account removeBorrowFromAccount(long accountId, long borrowId) {
        // Retrieve the Account object
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account is not exists with given id: " + accountId));

        // Retrieve the Borrow object
        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow is not exists with given id: " + borrowId));

        // Remove the Borrow object from the borrows list of the Account object
        account.getBorrow().remove(borrow);

        // Save the Account object
        return accountRepository.save(account);
    }

    @Override
    public Account findAccountProfileByJwt(String jwt) throws ResourceNotFoundException {
        String email=jwtProvider.getEmailFromToken(jwt);
        Account account=accountRepository.findByEmail(email);
        if (account == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return account;
    }


}
