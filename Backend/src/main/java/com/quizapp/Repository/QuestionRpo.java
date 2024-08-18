package com.quizapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizapp.Entity.Question;

@Repository
public interface QuestionRpo extends  JpaRepository<Question,Integer>{

}
