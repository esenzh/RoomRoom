import React, {Component} from 'react';
import {Carousel} from 'antd';
import {Calendar} from 'antd';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            img: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            vk: '',
            photo: '',
            nativeLocation: '',
        }
    }

    async componentDidMount() {
        const resp = await fetch('/api/profile');
        const data = await resp.json();
        this.setState({
            img: data.photo, first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            vk: data.vk,
            photo: data.photo,
        })

        // Добавить fetch на совпадения, отрисовать
        // Добавить fetch на фанатов, отрисовать

        // function onPanelChange(value, mode) {
        //     console.log(value, mode);
        // }
    }

    render() {
        return (
            <div>
                {/*<img src={this.state.img} alt="фото профиля"/>*/}
                <Carousel autoplay>
                    <div align={"center"}>
                        <img width={"190px"}
                             src={"https://images11.cosmopolitan.ru/upload/custom/47e/47e17c2a367e3259282d32e8bdb313f0.jpg"}/>
                    </div>
                    <div align={"center"}>
                        <img width={"190px"} src={"https://cdn-st1.rtr-vesti.ru/p/xw_1756468.jpg"}/>
                    </div>
                    <div align={"center"}>
                        <h3><img width={"190px"} src={"https://ubr.ua/img/article/38885/77_main.jpeg"}/></h3>
                    </div>
                    <div align={"center"}>
                        <h3><img width={"190px"}
                                 src={"https://s13.stc.all.kpcdn.net/share/i/12/11116435/inx960x640.jpg"}/></h3>
                    </div>
                    <div align={"center"}>
                        <h3><img width={"190px"} src={"https://ubr.ua/img/article/38698/2_main.jpeg"}/></h3>
                    </div>
                </Carousel>

                <div>
                    <div>
                        <table align={"center"} width={"70%"}
                               style={{fontStyle: "Courier New monospace, font-weight: bold"}}>
                            <tr>
                                <td align={"left"}>
                                    <p style={{fontSize: '25px'}}>{this.state.first_name} {this.state.last_name}</p>
                                    <p>{this.state.nativeLocation}</p>
                                    <img width={"20px"}
                                         src={"https://img.icons8.com/color/48/000000/lighthouse.png"}/> {this.state.nativLocation}, <img
                                    width={"20px"}
                                    src={"https://img.icons8.com/nolan/64/men-age-group-3.png"}/> Возраст: <p>{this.state.nativLocation}</p>
                                </td>
                            </tr>
                            <hr color='red'></hr>
                        </table>
                    </div>

                    <div>
                        <table align={"center"} width={"80%"}
                               style={{fontStyle: "Courier New monospace, font-weight: bold"}}>
                            <tr>
                                <td>
                                    <h4>Kонтакты</h4>
                                </td>
                            </tr>
                            <tr>
                                <td  style={{verticalAlign: "top"}}>
                                    <img width={"20px"}
                                         src={"https://img.icons8.com/cute-clipart/64/000000/phonelink-ring.png"}/> {this.state.phone}<br/>
                                    <img width={"20px"}
                                         src="https://img.icons8.com/dusk/64/000000/mail-ru-agent.png"/> {this.state.email}<br/>
                                    <img width={"20px"}
                                         src="https://img.icons8.com/color/48/000000/vk-circled.png"/>{this.state.vk}
                                </td>
                                <td align={"right"}>

                                    <div
                                        style={{width: 300, border: '1px solid #d9d9d9', borderRadius: 4}}>
                                        <Calendar fullscreen={false}/>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <footer style={{background: "lightblue", color: "#fff", margin: '0 auto', width: "80%"}} align={"center"}>
                        <p>RoomRoom</p>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Profile;