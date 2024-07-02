package com.example.bgreenscreen.services.auth;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.bgreenscreen.dto.SignupRequest;
import com.example.bgreenscreen.dto.UserDto;
import com.example.bgreenscreen.model.Role;
import com.example.bgreenscreen.model.User;
import com.example.bgreenscreen.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService  implements AuthServiceImpl{
    private final UserRepository userRepository;
    
//create admin 
   @PostConstruct
    public void createAdminAcount(){
        Optional <User> optionalUser = userRepository.findByRole(Role.ADMIN);
        if(optionalUser.isEmpty()){
            User user = new User();
            user.setEmail("admin@test.com");
            user.setUsername("admin");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setRole(Role.ADMIN);
            userRepository.save(user);
            System.out.println("admin  succuel create");
        }else{
            System.out.println("admin account already exist!");
        }

    }

//signup 
@Override
public UserDto signupUser(SignupRequest signupRequest) {
    User user = new User();
    user.setEmail(signupRequest.getEmail());
    user.setUsername(signupRequest.getUsername());
    user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
    user.setRole(Role.USER);
    User createdUser = userRepository.save(user);
    return createdUser.getUserDto();
}

@Override
public boolean hasUserwithEmail(String email) {
  return userRepository.findFirstByEmail(email).isPresent();  
}



}
