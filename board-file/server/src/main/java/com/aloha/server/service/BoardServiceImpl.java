package com.aloha.server.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.dto.Board;
import com.aloha.server.dto.Files;
import com.aloha.server.mapper.BoardMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;

    @Autowired
    private FileService fileService;

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
    public Board insert(Board board) throws Exception {
        int result = boardMapper.insert(board);
        log.info("result : " + result );
        int newNo = board.getNo();
        Board newBoard = boardMapper.select(newNo);

        // 파일 업로드
        Files fileInfo = new Files();
        String parentTable = "board";
        fileInfo.setParentTable(parentTable);
        fileInfo.setParentNo(newNo);
        List<MultipartFile> fileList = board.getFiles();

        if(fileList == null || fileList.isEmpty() ){
            log.info("첨부한 파일이 없습니다.");
            return newBoard;
        }

        List<Files> uplodedFileList = fileService.uploadFiles(fileInfo, fileList);
        if(uplodedFileList == null || uplodedFileList.isEmpty()){
            log.info("파일 업로드 실패!");
        }

        return newBoard;
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