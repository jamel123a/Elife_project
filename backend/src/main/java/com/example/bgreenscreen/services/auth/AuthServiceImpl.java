package com.example.bgreenscreen.services.auth;

import com.example.bgreenscreen.dto.SignupRequest;
import com.example.bgreenscreen.dto.UserDto;

public interface AuthServiceImpl {
    //signup 
   UserDto signupUser(SignupRequest signupRequest);

   //
   boolean hasUserwithEmail(String email);

}