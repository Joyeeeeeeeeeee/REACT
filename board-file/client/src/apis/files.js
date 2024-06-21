import axios from 'axios'

// 업로드
export const upload = (formData, headers) => axios.post(`/files/upload`, formData, headers)

// 다운로드
export const download = (no) => axios.get(`/files/${no}`, {responseType:'blob'})

// 삭제
export const remove = (no) => axios.delete(`/files/${no}`)

// 선택삭제
export const removeFiles = (no) => axios.delete(`/files?no=${no}`)