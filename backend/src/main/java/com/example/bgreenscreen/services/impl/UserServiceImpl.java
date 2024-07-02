package com.example.bgreenscreen.services.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.bgreenscreen.repository.UserRepository;
import com.example.bgreenscreen.services.UserService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


     private final UserRepository userRepository;


    @Override
    public UserDetailsService userDetailsService() {
       return new UserDetailsService() {

        @Override
        public UserDetails loadUserByUsername(String username)  {
            return userRepository.findFirstByEmail(username).orElseThrow(()-> new UsernameNotFoundException("User Not Found"));
        }
        
        
       };
    }
    
}