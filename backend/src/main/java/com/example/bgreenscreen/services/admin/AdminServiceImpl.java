package com.example.bgreenscreen.services.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.bgreenscreen.dto.UserDto;
import com.example.bgreenscreen.dto.UserUpdateDto;
import com.example.bgreenscreen.model.User;
import com.example.bgreenscreen.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{


    private final UserRepository userRepository;
    
    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll()
        .stream()
       // .filter(user -> user.getRole() == Role.USER)
        .map(User::getUserDto)
        .collect((Collectors.toList()));
    }


    @Override
    public UserDto getUserById(Long id) { 
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getUserDto();
    }

    @Override
    public UserDto addUser(UserDto userDto) {
        if (userRepository.findFirstByEmail(userDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setRole(userDto.getRole());
        user = userRepository.save(user);
        return user.getUserDto();
    }

    @Override
    public UserDto updateUser(Long id, UserUpdateDto userUpdateDto) {

       
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));


    if (!user.getEmail().equals(userUpdateDto.getEmail())) {
        Optional<User> existingUser = userRepository.findFirstByEmail(userUpdateDto.getEmail());
        if (existingUser.isPresent() && !existingUser.get().getId().equals(user.getId())) {
            throw new RuntimeException("Email already exists");
        }
    }
        user.setUsername(userUpdateDto.getUsername());
        user.setEmail(userUpdateDto.getEmail());
        user.setRole(userUpdateDto.getRole());
        user = userRepository.save(user);
        return user.getUserDto();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
}