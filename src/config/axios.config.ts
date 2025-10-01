'use server';

import axios  from 'axios'

const baseURL = `${process.env.BACKEND_DOMAIN}/api`;

export const api = axios.create({
    baseURL: baseURL,
    timeout: 7000,
    withCredentials:true,
    //headers: {'autorization': 'foobar'}
  });
  