package com.example.userapp.service;

import com.example.userapp.entity.User;
import com.example.userapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("USER_ALREADY_EXISTS");
        }

        return userRepository.save(user);
    }

    // LOGIN
    public User loginUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("USER_NOT_FOUND"));
    }

    // GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
