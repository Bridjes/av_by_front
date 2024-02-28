import React from 'react';
import classes from "./Card.css";

const Card = ({item}) => {
    const openInNewTab = () => {
        // проброс данных в адресной строке
        const url = 'car_view' + '?id=' + encodeURIComponent(JSON.stringify(item.id))
        const newWindow = window.open(url, '_blank');
        if (newWindow) newWindow.opener = null;
    };

    return (
        <div className="item_card">
            <div className="image_box">
                <img src={item.photo_1}
                     onClick={()=>openInNewTab()}/>
            </div>
            <div className="info_box">
                <div className="info_box_descrption">
                    <div className="item_name"
                         onClick={()=>openInNewTab()}
                    >
                        {item.brand} {item.model}
                    </div>
                    <div className="item_chars">
                        <div>{item.year} г.</div>
                        <div>{item.transmission}, {item.engine_volume}, {item.engine_type},</div>
                        <div>{item.body_type}</div>
                        <div className="item_millage">{item.mileage.toLocaleString('ru-RU')} км</div>
                    </div>
                    <div className="item_descrption">
                        <div className="item_descrption_text">
                            {item.description}
                        </div>
                        <div className="item_city">
                            {item.city}
                        </div>
                    </div>
                </div>
                <div className="item_price">
                    {item.price.toLocaleString('ru-RU')} $
                </div>
            </div>
        </div>
    );
};

export default Card;