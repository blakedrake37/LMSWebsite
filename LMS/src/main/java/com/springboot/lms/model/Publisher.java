package com.springboot.lms.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
@Setter
@Entity
@Table(name = "publisher")
public class Publisher {
    @Setter
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "publisherId")
    private long publisherId;
    @Column(name = "publisherName", nullable = false)
    private String publisherName;

}
