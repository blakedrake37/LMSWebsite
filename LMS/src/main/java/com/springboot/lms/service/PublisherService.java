package com.springboot.lms.service;

import com.springboot.lms.model.Publisher;

import java.util.List;

public interface PublisherService {
    Publisher savePublisher(Publisher publisher);
    Publisher getPublisherByID(long id);
    List<Publisher> getAllPublishers();
    Publisher updatePublisher(long id, Publisher publisher);
    void deletePublisher(long id);
}
