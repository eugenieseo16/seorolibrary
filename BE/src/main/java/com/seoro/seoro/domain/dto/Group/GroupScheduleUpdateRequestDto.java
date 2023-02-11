package com.seoro.seoro.domain.dto.Group;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupScheduleUpdateRequestDto {
    private Long groupScheduleId;
    private Long groupId;
    private Long writerId;
    private String groupScheduleTitle;
    private String groupScheduleContent;
}
