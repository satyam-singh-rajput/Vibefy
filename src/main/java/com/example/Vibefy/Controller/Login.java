package com.example.Vibefy.Controller;

import com.example.Vibefy.Dto.LoginDto;
import com.example.Vibefy.Enums.Enums;
import com.example.Vibefy.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class Login {
    private final UserService userService;

    public Login(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> loginUser(@RequestBody LoginDto loginRequest, HttpServletResponse response) {
        try {
            String res = userService.login(loginRequest);
            if (Enums.LOGIN_SUCCESSFUL.getMessage().equals(res)) {

                Cookie authCookie = new Cookie("vibe_session", loginRequest.getEmail());
                authCookie.setHttpOnly(true);
                authCookie.setMaxAge(60 * 60 * 24 * 30);
                authCookie.setPath("/");

                response.addCookie(authCookie);

                return ResponseEntity.ok(res);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during login.");
        }
    }
}