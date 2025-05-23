package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Comment;
import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public class CommentRepositoryImpl implements CommentRepository {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Comment> findAll(CommonEnums.Status status) {
        String query = "select c from Comment c where c.status = :status";
        return em.createQuery(query, Comment.class)
                .setParameter("status", status)
                .getResultList();
    }

    @Override
    public List<Comment> findByBoardNo(CommonEnums.Status status, Long boardNo) {
        String query = "select c from Comment c where c.status = :status and c.board.boardNo = :boardNo order by c.createDate";
        return em.createQuery(query, Comment.class)
                .setParameter("status", status)
                .setParameter("boardNo", boardNo)
                .getResultList();
    }

    @Override
    public void add(Comment comment) {
        em.persist(comment);
    }

    @Override
    public Optional<Comment> findByCommentNo(Long commentNo) {
        return Optional.ofNullable(em.find(Comment.class, commentNo));
    }

    @Override
    public void delete(Comment comment) {
        em.remove(comment);
    }
}
