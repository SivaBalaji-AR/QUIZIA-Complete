package com.quizapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizapp.Entity.User;

@Repository
public interface UserRpo extends JpaRepository<User, Integer>{

}
