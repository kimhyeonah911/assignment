package com.kh.reactbackend.dto;

import com.kh.reactbackend.entity.Member;
import lombok.*;

public class MemberDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create{
        private String user_id;
        private String user_pwd;
        private String user_name;

        public Member toEntity() {
            return Member.builder()
                    .userId(this.user_id)
                    .userPwd(this.user_pwd)
                    .userName(this.user_name)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private String user_id;
        private String user_pwd;
        private String user_name;

        public static Response toDto(Member member) {
            return Response.builder()
                    .user_id(member.getUserId())
                    .user_pwd(member.getUserPwd())
                    .user_name(member.getUserName())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Update{
        private String user_id;
        private String user_pwd;
        private String user_name;
    }
}
