package com.aloha.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.Board;
import com.aloha.server.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;

    @Override
    public List<Board> list() throws Exception {
        List<Board> boardList = boardMapper.list();
        return boardList;
    }

    @Override
    public Board select(int no) throws Exception {
        Board board = boardMapper.select(no);
        return board;
    }

    @Override
    public int insert(Board board) throws Exception {
        int result = boardMapper.insert(board);
        return result;
    }

    @Override
    public int update(Board board) throws Exception {
        int result = boardMapper.update(board);
        return result;
    }

    @Override
    public int delete(int no) throws Exception {
        int result = boardMapper.delete(no);
        return result;
    }

    @Override
    public int updateViews(int count, int no) throws Exception {
        int result = boardMapper.updateViews(count, no);
        return result;
    }

}