'use client';

import axios, { AxiosInstance }  from 'axios'

interface ApiClientProps{
  baseURL?:string;
}

class ApiClient{
  private baseURL:string;
  private axiosInstance:AxiosInstance; 

  constructor({ baseURL = ''}:ApiClientProps ){
    this.baseURL = baseURL;
      this.axiosInstance = axios.create({
        baseURL: this.baseURL,
        withCredentials:true,
        timeout: 1000,
      });
  }

  set setBaseURL(url:string){
    this.baseURL = url;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      withCredentials:true,
      timeout: 5000,
    });
  }

  get instance():AxiosInstance{
    return this.axiosInstance;
  }

}

export const apiClient:ApiClient = new ApiClient({});

