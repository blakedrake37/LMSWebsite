package com.springboot.lms.controller;

import com.springboot.lms.config.JwtProvider;
import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Account;
import com.springboot.lms.repository.AccountRepository;
import com.springboot.lms.request.LoginRequest;
import com.springboot.lms.response.AuthResponse;
import com.springboot.lms.service.AccountService;
import com.springboot.lms.service.impl.AccountUserImpl;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private AccountRepository accountRepository;
    private JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder;
    private AccountUserImpl accountUserImpl;

    public AuthController(AccountRepository accountRepository, AccountUserImpl accountUserImpl, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.accountRepository = accountRepository;
        this.accountUserImpl = accountUserImpl;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody Account account) throws ResourceNotFoundException {
        String email = account.getEmail();
        String password = account.getPassword();
        Account isUsernameExists = accountRepository.findByEmail(email);
        if (isUsernameExists != null) {
            throw new ResourceNotFoundException("Username is already exists");
        }
        Account newAccount = new Account();
        newAccount.setEmail(email);
        newAccount.setUsername(email);
        newAccount.setPassword(passwordEncoder.encode(password));
        newAccount.setActive(true);
        newAccount.setRole(1);
        newAccount.setCreatedAt(java.time.LocalDateTime.now());
        newAccount.setPhoneNum("1234567890");
        newAccount.setUsername(email);
        Account savedAccount = accountRepository.save(newAccount);
        Authentication authentication = new UsernamePasswordAuthenticationToken(savedAccount.getEmail(), savedAccount.getPassword(), new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("User registered successfully");
        return new ResponseEntity<AuthResponse>(authResponse, org.springframework.http.HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("User logged in successfully");
        return new ResponseEntity<AuthResponse>(authResponse, org.springframework.http.HttpStatus.OK);
    }

    private  Authentication authenticate(String email, String password) {
        UserDetails userDetails = accountUserImpl.loadUserByUsername(email);
        if(userDetails == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
