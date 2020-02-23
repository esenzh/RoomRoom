import React from 'react';
import Steps from "../../Steps";
import {Card} from "antd";
import Form from "./Form";

function RegisterWhoNoOwner () {
  return (
    <div style={{ padding: 10 }}>
      <Steps stepNumber={1} />
      <br /><br />
      <Card className='signUpForm'>
        <Form/>
      </Card>
    </div>
  );
}

export default RegisterWhoNoOwner;