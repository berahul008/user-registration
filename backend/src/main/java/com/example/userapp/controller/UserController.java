package com.example.userapp.controller;

import com.example.userapp.entity.User;
import com.example.userapp.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;



    public UserController(UserService userService) {
        this.userService = userService;
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.registerUser(user));
        } catch (RuntimeException ex) {

            if ("USER_ALREADY_EXISTS".equals(ex.getMessage())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(Map.of(
                                "error", "DUPLICATE_USER",
                                "message", "Duplicate entry. User already exists in the system."
                        ));
            }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "error", "INTERNAL_ERROR",
                            "message", "Unexpected server error"
                    ));
        }
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(
                    userService.loginUser(request.get("email"))
            );
        } catch (RuntimeException ex) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "message", "User not registered. Please register first."
                    ));
        }
    }

    // GET ALL USERS
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}

