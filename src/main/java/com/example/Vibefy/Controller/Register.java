package com.example.Vibefy.Controller;

import com.example.Vibefy.Dto.UserDto;
import com.example.Vibefy.Service.SignUpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
public class Register {
    private final SignUpService signUpService;

    public Register(SignUpService signUpService) {
        this.signUpService = signUpService;
    }

    @PostMapping
    public ResponseEntity<String> signUp(@RequestBody UserDto user){
        String response = signUpService.signUp(user);
        return ResponseEntity.ok(response);
    }
}
