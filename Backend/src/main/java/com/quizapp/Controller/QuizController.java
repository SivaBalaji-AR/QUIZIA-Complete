package com.quizapp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.Entity.Quiz;
import com.quizapp.Service.QuizService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	QuizService quizService;
	
	@GetMapping("/getQuiz")
	public List<Quiz> getQuiz(){
		return quizService.getQuizFromTable();
	}
	
	@PostMapping("/insertQuiz")
	public Quiz insertQuiz(@RequestBody Quiz quiz) {
		return quizService.insertQuizIntoTable(quiz);
	}
}
