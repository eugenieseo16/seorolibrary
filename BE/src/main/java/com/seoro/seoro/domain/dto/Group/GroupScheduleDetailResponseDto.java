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
public class GroupScheduleDetailResponseDto {
    private Boolean result;
    private Long groupId;
    private String groupScheduleTitle;
    private LocalDateTime groupScheduleTime;
    private String groupScheduleContent;
}
