package com.springboot.lms.service.impl;

import com.springboot.lms.exception.ResourceNotFoundException;
import com.springboot.lms.model.Publisher;
import com.springboot.lms.repository.PublisherRepository;
import com.springboot.lms.service.PublisherService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherServiceImpl implements PublisherService {
    private PublisherRepository publisherRepository;

    public PublisherServiceImpl(PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }

    @Override
    public Publisher savePublisher(Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    @Override
    public Publisher getPublisherByID(long id) {
        return publisherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Publisher is not exists with given id: "+ id));
    }

    @Override
    public List<Publisher> getAllPublishers() {
        return publisherRepository.findAll();
    }

    @Override
    public Publisher updatePublisher(long id, Publisher publisher) {
        Publisher publisherData = publisherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Publisher is not exists with given id: "+ id));
        if(publisher.getPublisherName() != null)
            publisherData.setPublisherName(publisher.getPublisherName());
        return publisherRepository.save(publisherData);
    }

    @Override
    public void deletePublisher(long id) {
        publisherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Publisher is not exists with given id: "+ id));
        publisherRepository.deleteById(id);
    }
}
