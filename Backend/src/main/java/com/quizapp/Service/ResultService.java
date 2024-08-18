package com.quizapp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizapp.Entity.Result;
import com.quizapp.Repository.ResultRpo;

@Service
public class ResultService {
	@Autowired
	ResultRpo resultRpo;

	public List<Result> getResultFromTable() {
		return resultRpo.findAll();
	}

	public Result insertResultIntoTable(Result result) {
		return resultRpo.save(result);
	}

}
