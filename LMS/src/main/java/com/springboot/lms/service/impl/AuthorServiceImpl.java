package com.springboot.lms.service.impl;

import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Author;
import com.springboot.lms.repository.AuthorRepository;
import com.springboot.lms.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {
    private AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public Author saveAuthor(Author author) {
        return authorRepository.save(author);
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Author getAuthorByID(long id) {
        return authorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Author is not exists with given id: "+ id));
    }

    @Override
    public Author updateAuthor(long id, Author authorDto) {
        Author authorData = authorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Author is not exists with given id: " + id));
        if(authorDto.getAuthorName() != null)
            authorData.setAuthorName(authorDto.getAuthorName());
        return authorRepository.save(authorData);
    }

    @Override
    public void deleteAuthor(long id) {
        authorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Author is not exists with given id: "+ id));
        authorRepository.deleteById(id);
    }
}
