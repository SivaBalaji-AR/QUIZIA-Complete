package com.quizapp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizapp.Entity.Question;
import com.quizapp.Repository.QuestionRpo;

@Service
public class QuestionService {

	@Autowired
	QuestionRpo questionRpo;

	public List<Question> getQuestionFromTable() {
		return questionRpo.findAll();
	}

	public Question insertQuestionIntoTable(Question question) {
		return questionRpo.save(question);
	}
}
