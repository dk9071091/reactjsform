
import './App.css';
import { React, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import assets from './assets/assets.jpg'
import { Form, Button, Figure, Row, Col ,InputGroup,FormControl} from 'react-bootstrap';
import { Eye,EyeOff } from 'react-feather';
const initialState = {
  name: '',
  email: '',
  mobileNumber: '',
  password: '',
  confirmedPassword: '',
  agree:false,
  showConfirmedPassword:false,
  showPassword:false,
  nameError: '',
  emailError: '',
  mobileNumberError: '',
  passwordError: '',
  confirmedPasswordError: '',
}

const Reducer = (state,{type,payload}) => {
  switch(type){
    case payload.Type:
      return {...state, ...payload}
    default:
      return state; 
  }
}
function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(handleFormValidation()){
      alert(' from submit successfully');
    }
    
  }
const onHandleChange=(e)=>{
  let name=e.target.name;
  let value=e.target.value;
  if(name==='agree'){
    dispatch({type:"FormControl",payload:{Type:"FormControl",[name]:!state.agree}});
  }else{
    dispatch({type:"FormControl",payload:{Type:"FormControl",[name]:value}});
  }
}

const handleFormValidation=()=>{
    var validate=true;
    if(state.mobileNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
     
      validate=true;
      dispatch({type:"mobileNumber",payload:{Type:"mobileNumber",mobileNumberError:false}});
    }else{
      validate=false;
      dispatch({type:"mobileNumber",payload:{Type:"mobileNumber",mobileNumberError:true}});
    }
    if(state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      validate=true;
      dispatch({type:"mobileNumber",payload:{Type:"mobileNumber",emailError:false}});
    }else{
      validate=false;
      dispatch({type:"mobileNumber",payload:{Type:"mobileNumber",emailError:true}});
    }
    if(state.password===state.confirmedPassword){
      validate=true;
      dispatch({type:"mobileNumber",payload:{Type:"mobileNumber",passwordError:false,confirmPasswordError:false}});
    }else{
      validate=false;
      dispatch({type:"mobileNumber",payload:{Type:"mobileNumber",passwordError:true,confirmPasswordError:true}});
    }
    
}

console.log(state,'state');

  return (
    <>
      <div className="container m-5">
        <div className="row">
          <div className="col-md-6">
            <Figure>
              <Figure.Image
                src={assets}
              />
            </Figure>
          </div>
          <div className="col-md-6">
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="john doe" name="name" onChange={onHandleChange}  value={state.name}/>
              </Form.Group>
              <Row>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicEmail2">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className={state.emailError?"is-invalid":"is-valid"} name="email" onChange={onHandleChange}  value={state.email}/>

                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicEmail3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="phone" placeholder="1234567899" className={state.mobileNumberError?'is-invalid':'is-valid'} name="mobileNumber" onChange={onHandleChange}  value={state.mobileNumber}/>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
              <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="password" 
                className={state.passwordError?"is-invalid":"is-valid"}
                placeholder=""
                name="password"
                onChange={onHandleChange}
                 value={state.password}
              />
              <Button variant="outline-secondary" type="button" onClick={()=>dispatch({type:'toggle',payload:{Type:'toggle',showPassword:!state.showPassword}})} id="button-addon2">
              {state.showPassword?<EyeOff size="14"/>:<Eye size="14"/>}
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                
                aria-describedby="basic-addon2"
                type={state.showConfirmedPassword?"text":"password"}
                placeholder=""
                className={state.confirmPasswordError?"is-invalid":"is-valid"}
                name="confirmedPassword"
                onChange={onHandleChange}
                value={state.confirmedPassword}
              />
              <Button variant="outline-secondary" type="button" onClick={()=>dispatch({type:'toggle',payload:{Type:'toggle',showConfirmedPassword:!state.showConfirmedPassword}})} id="button-addon2" >
              {state.showConfirmedPassword?<EyeOff size="14"/>:<Eye size="14"/>}
              </Button>
            </InputGroup>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" name="agree" onChange={onHandleChange}  checked={state.agree} value={state.agree}/>
                
              </Form.Group>
              <Button variant="primary" type="submit" disabled={state.agree?false:true}>
                    Submit
            </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
