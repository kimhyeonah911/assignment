package com.kh.reactbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "CATEGORY")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CATOGORY_NO")
    private Long categoryNo;

    @OneToOne(mappedBy = "category")
    private Board board;

    @Column(name = "CATEGORY_NAME", nullable = false, length = 100)
    private String categoryName;
}
