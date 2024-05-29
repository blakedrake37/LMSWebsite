package com.springboot.lms.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookItem")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
@Setter
public class BookItem {
    @Setter
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "bookItemId")
    private long bookItemId;
    @Column(name = "bookId")
    private Long bookId;
    @Column(name = "status")
    private int status;
}
