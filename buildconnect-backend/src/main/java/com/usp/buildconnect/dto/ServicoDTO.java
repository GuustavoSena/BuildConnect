package com.usp.buildconnect.dto;

import com.usp.buildconnect.entity.Servico;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServicoDTO {
    private Long id;
    private String type;

    public ServicoDTO(Servico servico) {
        this.id = servico.getId();
        this.type = servico.getType();
    }
}