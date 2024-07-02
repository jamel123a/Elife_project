package com.example.bgreenscreen.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.bgreenscreen.dto.AuthenticationResponse;
import com.example.bgreenscreen.dto.AuthenticationResquest;
import com.example.bgreenscreen.dto.SignupRequest;
import com.example.bgreenscreen.dto.UserDto;
import com.example.bgreenscreen.model.User;
import com.example.bgreenscreen.repository.UserRepository;
import com.example.bgreenscreen.services.UserService;
import com.example.bgreenscreen.services.auth.AuthService;
import com.example.bgreenscreen.utils.JwtUtil;



import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final UserService userService;

    private final AuthenticationManager authenticationManager;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest){
        if(authService.hasUserwithEmail(signupRequest.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exist with this email");
        
        }
           
        UserDto creaUserDto = authService.signupUser(signupRequest);
        if (creaUserDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not created");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(creaUserDto);

            
    }

    /// login register
    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationResquest authenticationResquest){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationResquest.getEmail(), 
                authenticationResquest.getPassword()));
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Incorrect username or password");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationResquest.getEmail());
        Optional <User> optionalUser = userRepository.findFirstByEmail(authenticationResquest.getEmail()); 
        final String jwtToken = jwtUtil.generateToken(userDetails,optionalUser.get().getRole().name());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if(optionalUser.isPresent()){
            authenticationResponse.setJwt(jwtToken);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setRole(optionalUser.get().getRole());
        }
        return authenticationResponse;


    }
}