package com.usp.buildconnect.dto;

import com.usp.buildconnect.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {

    private Long id;
    private String name;
    private String email;
    private String city;
    private String role;

    public UserProfileDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getUsername();
        this.city = user.getCity();
        this.role = user.getRole();
    }
}