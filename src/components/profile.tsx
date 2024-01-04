import React from 'react';
import { useEffect } from 'react'
import { Avatar, Flex, useColorModeValue} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setUserLoggedin } from '../slices/userSlice';
import './profile.css'
import Footer from './footer';
const Profile = () => {

    const { user } = useSelector((state: any) => state.user)
    const { email } = useSelector((state: any) => state.user)

    const dispatch = useDispatch<AppDispatch>();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    return (
        <><div style={{ position: "fixed", marginLeft: "55%", marginTop: "20%" }}>
            <Flex bg={formBackground}>
                <div className="wrapper">
                    <div className="left">
                        <Avatar size='2xl' name='Ryan Florence' src='https://bit.ly/ryan-florence' />{' '}
                        <h4>{user.firstName + '\t' + user.lastName}</h4>
                        <h6>{user.email}</h6>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Information</h3>
                            <div className="info_data">
                                <div className="data">
                                    <h4>Phone</h4>
                                    <p>{user.countrycode + '\t' + user.mobilenumber}</p>
                                </div>
                                <div className="data">
                                    <h4>Country</h4>
                                    <p>{user.country}</p>
                                </div>
                            </div>
                            <div className="info_data">
                                <div className="data">
                                    <h4>Gender</h4>
                                    <p>{user.gender}</p>
                                </div>
                                <div className="data">
                                    <h4>DateOfBirth</h4>
                                    <p>{user.dateofbirth}</p>
                                </div>
                            </div>
                        </div>
                        <div className="social_media">
                            <ul>
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Flex>

        </div><div style={{marginTop:"154%",marginLeft:"60%",width:"100%"}}>
                <Footer></Footer>
            </div></>
    )
}
export default Profile