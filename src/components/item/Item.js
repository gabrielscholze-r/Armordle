import React, { useState } from 'react'
import './Item.css'
export default function Item({itemData}) {
    const [data, setData] = useState(itemData)
    return (
        <div class="item-container d-inline-flex mx-auto align-items-center">
            <div class="d-flex align-items-center width-div-pattern-img mx-1"><img src={`http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${itemData.image.full}`} className="w-100" alt=""/></div>
            <div class="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p class="p-2 m-auto">{data.name}</p>
            </div>
            <div class="d-flex align-items-center width-div-pattern mx-1">
                <p class="m-auto">AP</p>
            </div>
            <div class="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p class="m-auto">LIFE</p>
            </div>
            <div class="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p class="m-auto">MR</p>
            </div>
            <div class="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p class="m-auto">ARMOR</p>
            </div>
            <div class="d-flex align-items-center p-2 width-div-pattern mx-1">
                <p class="m-auto">COST</p>
            </div>
        </div>
    )
}
