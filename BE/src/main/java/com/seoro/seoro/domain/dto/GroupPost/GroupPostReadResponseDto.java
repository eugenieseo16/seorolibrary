package com.seoro.seoro.domain.dto.GroupPost;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupPostReadResponseDto {
    private Boolean result;
    private List<GroupPostDto> groupPost;
}
