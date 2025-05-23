package com.kh.reactbackend.entity;

import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "BOARD")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_NO")
    private Long boardNo;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "CATEGORY_NO", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_WRITER", nullable = false)
    private Member member;

    @Column(name = "BOARD_TITLE", length = 100, nullable = false)
    private String boardTitle;

    @Lob
    @Column(name = "BOARD_CONTENT", nullable = false)
    private String boardContent;

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;

    private Integer count;

    @Enumerated(EnumType.STRING)
    @Column(length = 1, nullable = false)
    private CommonEnums.Status status;

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();

        if(this.status == null) {
            this.status = CommonEnums.Status.Y;
        }

        this.count = 0;
    }

    public void changeBoardTitle(String boardTitle) {
        this.boardTitle = boardTitle;
    }

    public void changeBoardContent(String boardContent) {
        this.boardContent = boardContent;
    }

    public void changeMember(Member member) {
        this.member = member;
    }

    public void changeCategory(Category category) {
        this.category = category;
    }

    public void changeCount() {
        this.count++;
    }

    public void changeStatus() {
        this.status = CommonEnums.Status.N;
    }
}
