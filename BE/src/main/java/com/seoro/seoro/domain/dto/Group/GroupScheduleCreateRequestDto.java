package com.seoro.seoro.domain.dto.Group;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupScheduleCreateRequestDto {
    private Long groupId;
    private Long writerId;
    private String date;
    private String groupScheduleTitle;
    private String groupScheduleContent;
}
