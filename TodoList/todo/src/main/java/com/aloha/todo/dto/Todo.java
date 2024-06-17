package com.aloha.todo.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Todo {
    public int no;
    public String name;
    public int status;
    public Date regDate;
    public Date updDate;
}