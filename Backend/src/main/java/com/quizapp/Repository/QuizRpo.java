package com.quizapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizapp.Entity.Quiz;

@Repository
public interface QuizRpo extends JpaRepository<Quiz, Integer>{

}
