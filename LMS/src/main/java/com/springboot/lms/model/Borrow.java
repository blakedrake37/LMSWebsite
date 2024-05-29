package com.springboot.lms.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Borrow")
public class Borrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "borrowId")
    private long borrowId;
    @Column(name = "borrowDate", nullable = true)
    @Temporal(TemporalType.DATE)
    private Date borrowDate;
    @Column(name = "returnDate", nullable = true)
    @Temporal(TemporalType.DATE)
    private Date returnDate;
    @Column(name = "accountID")
    private long accountID;
    @Column(name = "fine", nullable = true)
    private double fine;

}
