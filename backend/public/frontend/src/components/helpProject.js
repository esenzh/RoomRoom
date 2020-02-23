import React, {Component} from 'react';
import logo from "../images/logo.png";
import team from "../images/team.jpg";

import {Card} from "antd";
import {Link} from "react-router-dom";

class HelpProject extends Component {
    render() {
        return (
            <div className='registerForm'>
                <Card  style={{ borderRadius: '30px', marginTop: '10px', backgroundColor: 'white', width: '55%', }}>
                    <div style={{textAlign: 'center'}}>
                        <img style={{width: '130px'}} src={logo} alt="" />
                        <h3 style={{color: '#4a76a8'}}>Поддержи проект RoomRoom!</h3>
                    </div>
                    <br/>
                    <div style={{textAlign: 'justify', fontFamily: 'Times New Roman, Times, serif', fontStyle: 'italic', fontSize: '18px'}}>

                        <p>Проект создавался на бесплатной основе благодаря идеям и желению разработчиков решить одну из социальных проблем, существующих в сфере аренды недвижимости, а именно поиска людей для совместной аренды жилья! Наш сервис помог уже сотням людей, но мы не собираемся на этом останавливаться
                        Надеемся что наш проект будет помогать тысячам других людей в поиске хорошего, комфортного и недорогого жилья в городах России. Для реализации новых фцнкциональных возможностей необходимы инвестиционные средства.
                        Надеемся на помощь наших пользователей, поддержку проекта и его дальнейшее развитие! </p>
                        <br/>
                        Принимаем средства по следующим реквизитам:
                        <br/>
                        Сбербанк онлайн:XXXX XXXX XXXX XXXX XXXX,<br/>
                        Яндекс деньги: _____________________,<br/>
                        Биткоин кошелек: ___________________,<br/>
                        Тинкофф банк: _____________________,<br/>
                        Qiwi: ______________________________,<br/>
                        Биткоин кошелек: ___________________,<br/>

                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <h3 style={{color: '#4a76a8'}}>Команда разработчиков!</h3>
                    </div>
                    <br/>
                    <img src={team} alt="Without photo" width={'100%'}/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <h3 style={{color: '#4a76a8'}}>Product meneger!</h3>
                    </div>
                    <br/>
                    <img src='' alt="Without photo" width={'100%'}/>
                </Card>
                <br/>
            </div>
        );
    }
}

export default HelpProject;