package com.example.bgreenscreen.services.admin;

import java.util.List;

import com.example.bgreenscreen.dto.UserDto;
import com.example.bgreenscreen.dto.UserUpdateDto;

public interface AdminService {
    List<UserDto> getUsers();
    UserDto getUserById(Long id); 
    UserDto addUser (UserDto userDto);
    UserDto updateUser (Long id,UserUpdateDto userUpdateDto);
    void deleteUser (Long id );

}