package com.quizapp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizapp.Entity.User;
import com.quizapp.Repository.UserRpo;

@Service
public class UserService {

	@Autowired
	UserRpo userRpo;

	public List<User> getUserDetailsFromTable() {
		return userRpo.findAll();
	}

	public User insertIntoTheTable(User user) {
		return userRpo.save(user);
	}
}
