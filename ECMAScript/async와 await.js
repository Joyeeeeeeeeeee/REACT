async function fetchData(){
    const response = await fetch('http://httpbin.org/get')
    // await를 쓰면 비동기 응답을 기다린다.
    console.log(response);
    // json 객체로 변환
    const data = await response.json();

    // response.then((result)=>{
    //     console.log(result);
    // })
    return data
}

// async 함수 바깥에서는 await를 쓸 수 없다.
// const result = await fetchData()
// console.log("최종 결과");
// console.log(result);
fetchData()
    .then((data) => {
        console.log(data);
    })



console.log(`async await 비동기 요청 처리`);