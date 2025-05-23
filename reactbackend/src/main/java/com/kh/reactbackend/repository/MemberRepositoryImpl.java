package com.kh.reactbackend.repository;

import com.kh.reactbackend.entity.Member;
import com.kh.reactbackend.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public class MemberRepositoryImpl implements MemberRepository{
    @PersistenceContext
    private EntityManager em;

    @Override
    public void add(Member member) {
        em.persist(member);
    }

    @Override
    public List<Member> findAll(CommonEnums.Status status) {
        String query = "select m FROM Member m WHERE m.status = :status";
        return em.createQuery(query, Member.class).setParameter("status", status).getResultList();
    }

    @Override
    public Optional<Member> find(String id) {
        return Optional.ofNullable(em.find(Member.class, id));
    }
}
