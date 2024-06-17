package com.aloha.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.todo.dto.Todo;

@Mapper
public interface TodoMapper {
    public List<Todo> list();
    public Todo select(int no);
    public int insert(Todo todo);
    public int update(Todo todo);
    public int delete(int no);
    public int statusUpdate(int no);
    public int lastId() throws Exception;
    // 전체 수정
    public int completeAll() throws Exception;
    // 전체 삭제
    public int deleteAll() throws Exception;
}
