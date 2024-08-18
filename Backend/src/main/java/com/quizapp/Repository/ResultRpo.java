package com.quizapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizapp.Entity.Result;

@Repository
public interface ResultRpo extends JpaRepository<Result, Integer>{

}
