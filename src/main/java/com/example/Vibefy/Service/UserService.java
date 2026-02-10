package com.example.Vibefy.Service;

import com.example.Vibefy.Dto.LoginDto;
import com.example.Vibefy.Dto.UserDto;
import com.example.Vibefy.Entity.User;
import com.example.Vibefy.Enums.Enums;
import com.example.Vibefy.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    UserService(UserRepository userRepo, PasswordEncoder passwordEncoder){
        this.userRepo =userRepo;
        this.passwordEncoder = passwordEncoder;
    }
    public String login(LoginDto loginDto) {
        try {
                User user = userRepo.findByEmail(loginDto.getEmail())
                        .orElseThrow(() -> new RuntimeException(Enums.USER_NOT_FOUND.getMessage()));
                UserDto userDto = new UserDto(user);
                if (passwordEncoder.matches(loginDto.getPassword(), userDto.getPassword())) {
                    return Enums.LOGIN_SUCCESSFUL.getMessage();
                } else {
                    return  Enums.INCORRECT_PASSWORD.getMessage();
                }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
