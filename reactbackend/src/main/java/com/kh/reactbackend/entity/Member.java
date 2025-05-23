package com.kh.reactbackend.entity;

import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "MEMBER")
@DynamicInsert
@DynamicUpdate
public class Member {
    @Id
    @Column(name = "USER_ID" ,length = 20)
    private String userId;

    @OneToMany(mappedBy = "member",  cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "member",  cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @Column(name = "USER_PWD" ,length = 30, nullable = false)
    private String userPwd;

    @Column(name = "USER_NAME" ,length = 20, nullable = false)
    private String userName;

    @Enumerated(EnumType.STRING)
    @Column(length = 1, nullable = false)
    private CommonEnums.Status status;

    @PrePersist
    public void prePersist() {
        if(this.status == null) {
            this.status = CommonEnums.Status.Y;
        }
    }

    public void changeName(String userName) {
        this.userName = userName;
    }

    public void changePwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public void changeStatus() {
        this.status = CommonEnums.Status.N;
    }
}
