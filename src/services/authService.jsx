import jwt from 'jwt-decode';

export function getUser(){
    let token = localStorage.getItem('token');
    return token ? jwt(token) :null;
}