package com.springboot.lms.model;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "author")
public class Author {
    @Setter
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "authorId")
    private long authorId;
    @Column(name = "authorName", nullable = false)
    private String authorName;

}
