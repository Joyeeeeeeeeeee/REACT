package com.aloha.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.todo.dto.Todo;
import com.aloha.todo.mapper.TodoMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TodoServiceImpl implements TodoService{

    @Autowired
    private TodoMapper todoMapper;

    @Override
    public List<Todo> list() {
        List<Todo> todoList = todoMapper.list();
        return todoList;
    }

    @Override
    public Todo select(int no) {
        Todo todo = todoMapper.select(no);
        return todo;
    }

    // @Override
    // public int insert(Todo todo) {
    //     int result = todoMapper.insert(todo);
    //     return result;
    // }

    @Override
    public int update(Todo todo) {
        int result = todoMapper.update(todo);
        return result;
    }   

    @Override
    public int delete(int no) {
        int result = todoMapper.delete(no);
        return result;
    }

    @Override
    public int statusUpdate(int no) {
        int result = todoMapper.statusUpdate(no);
        return result;
    }

    @Override
    public int insert(Todo todo) throws Exception {
        int result = todoMapper.insert(todo);
        // log.info("todo : " + todo);
        // log.info("result : " + result);
        if(result > 0)
            result = todoMapper.lastId();
        return result;
    }

    @Override
    public int deleteAll() throws Exception {
        int result = todoMapper.deleteAll();
        return result;
    }
    
    @Override
    public int lastId() throws Exception {
        return todoMapper.lastId();
    }

}
