import React from 'react';
import Steps from "../../Steps";
import {Card} from "antd";
import FormNoOwner from "./FormNoOwner";

function RegisterWhereNoOwner () {
    return (
      <div style={{ padding: 10 }}>
        <Steps stepNumber={0} />
        <br /><br />
        <Card className='signUpForm'>
          <FormNoOwner/>
        </Card>
      </div>
    );
}

export default RegisterWhereNoOwner;