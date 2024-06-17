import React from 'react'
import Card from './Card'

const CardList = () => {
    // Card 컴포넌트에 전달할 데이터 배열
    const cardData = [
        {no:1, title:'마라샹궈',content:'마라 볶은거'},
        {no:2, title:'짬뽕',content:'해물, 면, 그런거'},
        {no:3, title:'김밥',content:'날치알 김밥'},
        {no:4, title:'볶음밥',content:'김치 볶음밥'}
    ]

    return (
        <div>
            <h1>Card List</h1>
            {/* <Card></Card>
            <Card></Card>
            <Card></Card> */}
            {
                cardData.map((card, index) => {
                    return <Card key={card.no} title={card.title} content={card.content} />
                })
            }
        </div>
    )
}

export default CardList