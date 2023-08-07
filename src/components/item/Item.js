import React, { useState } from 'react'
import './Item.css'
export default function Item({itemData}) {
    const [data, setData] = useState(itemData)
    return (
        <div className="item-container d-inline-flex mx-auto align-items-center">
            <div className="d-flex align-items-center width-div-pattern-img mx-1"><img src={`http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${itemData.image.full}`} className="w-100" alt=""/></div>
            <div className="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p className="p-2 m-auto">{data.name}</p>
            </div>
            <div className="d-flex align-items-center width-div-pattern mx-1">
                <p className="m-auto">AP</p>
            </div>
            <div className="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p className="m-auto">LIFE</p>
            </div>
            <div className="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p className="m-auto">MR</p>
            </div>
            <div className="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p className="m-auto">ARMOR</p>
            </div>
            <div className="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p className="m-auto">COST</p>
            </div>
        </div>
    )
}
