package com.quizapp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.Entity.Result;
import com.quizapp.Service.ResultService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/result")
public class ResultController {

	@Autowired
	ResultService resultService;
	
	@GetMapping("/getResult")
	public List<Result> getResult(){
		return resultService.getResultFromTable();
	}
	
	@PostMapping("/insertResult")
	public Result insertResut(@RequestBody Result result) {
		return resultService.insertResultIntoTable(result);
	}
}
