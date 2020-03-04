import React, {Component} from 'react';
import {Card, Form} from "antd";
import logo from "../images/logo.png";
import {Link} from "react-router-dom";

class AboutProject extends Component {
    render() {
        return (
            <div className='registerForm'>
                <Card  style={{ borderRadius: '30px', marginTop: '10px', backgroundColor: 'white', width: '55%', }}>
                    <div style={{textAlign: 'center'}}>
                        <img style={{width: '130px'}} src={logo} alt="" />
                        <h3 style={{color: '#4a76a8'}}>O проектe RoomRoom!</h3>
                    </div>
                    <br/>
                    <div style={{textAlign: 'justify', fontFamily: 'Times New Roman, Times, serif', fontStyle: 'italic', fontSize: '18px'}}>

                        <p>Рады приветствовать Вас на сайте RoomRoom! Используя наш сервис Вы сможете найти подходящего Вам человека для совместного съема квартиры в аренду в городе Москве! Благодаря RoomRoom Вы подыщите человека, желающего проживать на одинаковой с Вами станции метро, по схожей стоимости и то самое главное - подходящего Вам по интересам или сфере деятельности! Система выстраивает и  показывает Вам пользователей по совпавшим интересам от наиболее подходящих к менее подходящим, но также имеющим с Вами хотя бы одно совпадение интересов. После того как Вы нажмете на лайк, понравившийся пользователь получит об этом уведомление. После того как он тоже добавит Вас в понравившихся пользователей вы сможете увидеть контакты друг друга в своем профиле.
                            Однако помните, что созданная Вами анкета для поиска подходящего человека удаляется через каждые три дня для поддержания актуальности базы данных пользователей. Чтобы этого не произошло обновляйте свою анкету в профиле, либо создайте новую анкету!

                            Приятного использования сервиса RoomRoom и проживания в замечательном городе Москве, столице нашей Родины!      </p>
                        <br/>
                        <div align={'right'}>© TeamRoomRoom, 2020</div>
                       <div align={'center'}><Link to={"/signup"}>Зарегистрироваться!</Link><br/>
                           Или <Link to={"/login"}>войти!</Link><br/></div>

                    </div>

                </Card>
                <br/>
            </div>
        );
    }
}

export default AboutProject;