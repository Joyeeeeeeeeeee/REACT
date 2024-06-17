package com.aloha.todo.service;

import java.util.List;

import com.aloha.todo.dto.Todo;

public interface TodoService {
    public List<Todo> list();
    public Todo select(int no);
    // public int insert(Todo todo);
    public int update(Todo todo);
    public int delete(int no);
    public int statusUpdate(int no);

    public int lastId() throws Exception;

    // 게시글 등록
    public int insert(Todo todo) throws Exception;

    // 전체 삭제
    public int deleteAll() throws Exception;
}
