package com.usp.buildconnect.dto;

import com.usp.buildconnect.entity.Post;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostCardDTO {

    private Long id;
    private String title;
    private String firstImage;
    private Long professionalId;
    private String professionalName;
    private double averageRating;

    public PostCardDTO(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();

        if (post.getImages() != null && !post.getImages().isEmpty()) {
            this.firstImage = post.getImages().get(0).getUrl();
        } else {
            this.firstImage = null;
        }

        if (post.getProfessional() != null) {
            this.professionalId = post.getProfessional().getId();
            this.averageRating = post.getProfessional().getMean_avaliation();
            if (post.getProfessional().getUser() != null) {
                this.professionalName = post.getProfessional().getUser().getName();
            }
        }
    }
}