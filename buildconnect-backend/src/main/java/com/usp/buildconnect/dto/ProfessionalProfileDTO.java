package com.usp.buildconnect.dto;

import com.usp.buildconnect.entity.Professional;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ProfessionalProfileDTO {

    private Long id;
    private String name;
    private String city;
    private String profilePhoto;
    private String backgroundPhoto;
    private double averageRating;
    private List<PostCardDTO> posts;

    public ProfessionalProfileDTO(Professional professional) {
        this.id = professional.getId();
        this.backgroundPhoto = professional.getBackground_photo();
        this.averageRating = professional.getMean_avaliation();

        if (professional.getUser() != null) {
            this.name = professional.getUser().getName();
            this.city = professional.getUser().getCity();
            this.profilePhoto = professional.getUser().getPhoto();
        }

        if (professional.getPosts() != null) {
            this.posts = professional.getPosts().stream()
                    .map(PostCardDTO::new)
                    .collect(Collectors.toList());
        }
    }
}