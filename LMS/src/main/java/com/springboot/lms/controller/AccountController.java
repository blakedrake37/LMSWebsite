package com.springboot.lms.controller;


import com.springboot.lms.model.Account;
import com.springboot.lms.service.AccountService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping()
    public ResponseEntity<Account> saveAccount(@RequestBody Account account) {
        return new ResponseEntity<Account>(accountService.saveAccount(account), org.springframework.http.HttpStatus.CREATED);
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountByID(@PathVariable("id") long id) {
        return new ResponseEntity<Account>(accountService.getAccountByID(id), org.springframework.http.HttpStatus.OK);
    }
    @GetMapping("/profile")
    public ResponseEntity<Account> getAccountProfileByJwt(@RequestHeader("Authorization") String jwt) {
        return new ResponseEntity<Account>(accountService.findAccountProfileByJwt(jwt), org.springframework.http.HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable("id") long id, @RequestBody Account accountDto) {
        return new ResponseEntity<Account>(accountService.updateAccount(id, accountDto), org.springframework.http.HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable("id") long id) {
        accountService.deleteAccount(id);
        return new ResponseEntity<String>("Account deleted successfully", org.springframework.http.HttpStatus.OK);
    }
}
