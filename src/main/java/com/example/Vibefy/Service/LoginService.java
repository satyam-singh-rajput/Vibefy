package com.example.Vibefy.Service;

import com.example.Vibefy.Dto.LoginDto;
import com.example.Vibefy.Dto.UserDto;
import com.example.Vibefy.Enums.LoginSignUpResponseEnum;
import com.example.Vibefy.Repository.LoginRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class LoginService {
    private final LoginRepository loginRepo;
    private final PasswordEncoder passwordEncoder;
    LoginService(LoginRepository loginRepo, PasswordEncoder passwordEncoder){
        this.loginRepo =loginRepo;
        this.passwordEncoder = passwordEncoder;
    }
    public String login(LoginDto loginDto) {
        try {
            if (loginRepo.existsByEmail(loginDto.getEmail())) {
                UserDto userDto = new UserDto(loginRepo.findByEmail(loginDto.getEmail()));
                if (passwordEncoder.matches(loginDto.getPassword(), userDto.getPassword())) {
                    return LoginSignUpResponseEnum.LOGIN_SUCCESSFUL.getMessage();
                } else {
                    return  LoginSignUpResponseEnum.INCORRECT_PASSWORD.getMessage();
                }
            } else {
                return LoginSignUpResponseEnum.USER_NOT_FOUND.getMessage();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
