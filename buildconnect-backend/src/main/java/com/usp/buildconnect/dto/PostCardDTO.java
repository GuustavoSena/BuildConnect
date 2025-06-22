package com.usp.buildconnect.dto;

import com.usp.buildconnect.entity.Post;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class PostCardDTO {

    private Long id;
    private String title;
    private String firstImage;
    private String professionalName;
    private double averageRating;
    private BigDecimal price;

    public PostCardDTO(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.professionalName = post.getProfessional().getUser().getName();
        this.averageRating = post.getProfessional().getMean_avaliation();
        this.price = post.getPrice();

        if (post.getImages() != null && !post.getImages().isEmpty()) {
            this.firstImage = post.getImages().get(0).getUrl();
        }
    }
}