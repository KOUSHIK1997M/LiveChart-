import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import {userRegister} from '../store/actions/authAction';
import {useAlert} from 'react-alert'
import {SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR} from '../store/types/authType'


export default function Register(props) {

    // console.log(props)
    const alert = useAlert();
    const {loading, successMessage, error, authenticate, myInfo} = useSelector(state => state.auth)

    // console.log(myInfo)

    const dispatch = useDispatch();

    const [state, setState] = useState({
        userName : '',
        email : "",
        password:'',
        confirmPassword : '',
        image : null
    })

    const [loadImage, setLoadImage] = useState('');

    const inputHendle = (e) =>{
        setState({
            ...state, [e.target.name] : e.target.value
        })
    
    }

    const fileHendle = (e) =>{
        if(e.target.files.length !== 0){
            setState({
                ...state, [e.target.name] : e.target.files[0]
            })
        }
        const reader = new FileReader();

        reader.onload = () =>{
            setLoadImage(reader.result);
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const register = (e) =>{
        const {userName, email, password, image, confirmPassword} = state
        e.preventDefault();
        const formData = new FormData();

        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('image', image);

        dispatch(userRegister(formData));
        // console.log(image)
    }

    useEffect(()=>{
        // if(authenticate){
        //     history.push('/')
        // }
        if(successMessage){
            alert.success(successMessage)
            dispatch({type : SUCCESS_MESSAGE_CLEAR})
        }
        if(error){
            error.map(err=>alert.error(err))
            dispatch({type : ERROR_CLEAR})

        }
    },[successMessage, error])


    return (
        <div className='register'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Register</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={register}>
                        <div className='form-group'>
                            <label htmlFor='username'>User Name</label>
                            <input type='text' name='userName' onChange={inputHendle} value={state.userName} className='form-control' placeholder='user name' id='username' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' onChange={inputHendle} value={state.email} className='form-control' placeholder='email' id='email' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password'  name='password' onChange={inputHendle} value={state.password} className='form-control' placeholder='password' id='password' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='confirmpassword'>Confirm password</label>
                            <input type='password' name='confirmPassword' onChange={inputHendle} value={state.confirmPassword} className='form-control' placeholder='confirm password' id='confirmpassword' />
                        </div>
                        <div className='form-group'>
                            <div className='file-image'>
                                <div className='image'>
                                {loadImage ? <img alt='' src={loadImage} /> : ''}
                                </div>
                                <div className='file'>
                                    <label htmlFor='image'>Select Image</label>
                                    <input type='file' name='image' onChange={fileHendle} className='form-control' id='image' />
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <input type='submit' value='register' className='btn' />
                        </div>
                        <div className='form-group'>
                            <span><Link to='/messenger/login'>Login your account</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
