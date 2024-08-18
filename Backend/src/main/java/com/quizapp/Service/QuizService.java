package com.quizapp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizapp.Entity.Quiz;
import com.quizapp.Repository.QuizRpo;

@Service
public class QuizService {

	@Autowired
	QuizRpo quizRpo;

	public List<Quiz> getQuizFromTable() {
		return quizRpo.findAll();
	}

	public Quiz insertQuizIntoTable(Quiz quiz) {
		return quizRpo.save(quiz);
	}
}
