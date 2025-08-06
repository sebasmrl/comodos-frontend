'use server';

import axios  from 'axios'

const baseURL = `${process.env.BACKEND_DOMAIN}/api`;

export const api = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    withCredentials:true,
    //headers: {'autorization': 'foobar'}
  });
  