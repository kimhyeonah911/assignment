package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Board;
import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public class BoardRepositoryImpl implements BoardRepository {
    @PersistenceContext
    private EntityManager em;

    @Override
    public PageImpl<Board> findAll(CommonEnums.Status status, Pageable pageable) {
        String query = "select b from Board b where b.status = :status order by b.createDate desc";
        List<Board> board =  em.createQuery(query, Board.class)
                .setParameter("status",status)
                .setFirstResult((int)pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        String countQuery = "select count(*) from Board b where b.status = :status";
        Long count = em.createQuery(countQuery, Long.class)
                .setParameter("status", status)
                .getSingleResult();

        return  new PageImpl<>(board,pageable,count);
    }

    @Override
    public Optional<Board> findByNo(Long boardNo) {
        return Optional.ofNullable(em.find(Board.class, boardNo));
    }

    @Override
    public void add(Board board) {
        em.persist(board);
    }
}
