package com.springboot.lms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
@Table(name = "BorrowDetail")
public class BorrowDetail {
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long borrowDetailId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "borrowId", referencedColumnName = "borrowId")
    private Borrow borrow;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bookItemId", referencedColumnName = "bookItemId")
    private BookItem bookItem;
    @Column(name = "status", nullable = false)
    private int status;

}
