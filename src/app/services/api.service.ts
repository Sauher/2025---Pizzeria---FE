import { Injectable } from '@angular/core';
import axios from 'axios';
import { apiRES } from '../interfaces/apiRES';
import { enviroment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  SERVER = enviroment.serverUrl
  constructor() { }

  // Get all records from table
  async SelectAll(table: string): Promise<apiRES>{
    try{
      const res = await axios.get(`${this.SERVER}/${table}`)
    return {
      status:200,
      data : res.data
    }
    }
    catch (err : any){
      return {
        status:500,
        message: "Hiba történt az adatok lekéréskor"
      }
    }
    
  }
  // GET ONE record by id from table
  async Select(table:string, id:number):Promise<apiRES>{
    try{
      const res = await axios.get(`${this.SERVER}/${table}/${id}`)
    return {
      status:200,
      data : res.data
    }
    }
    catch (err : any){
      return {
        status:500,
        message: "Hiba történt az adatok lekéréskor"
      }
    }
  }

  async Insert(table: string, data: any){
    try{
<<<<<<< HEAD
      const res = await axios.post(`${this.SERVER}/${table}` , data)
=======
      const res = await axios.post(`${this.SERVER}/${table}` , data,{headers:{'Content-Type':'application.json'}})
>>>>>>> eb341e226cb4e2862c0d0d0e3c3f6e87edd8479a
    return {
      status:200,
      message: "Rekord felvéve",
      data : res.data
    }
    }
    catch (err : any){
      return {
        status:500,
        message: "Hiba történt az adatok felvitelekor"
      }
    }
  }
  async Update(table: string, id : number, data: any){
    try{
      const res = await axios.patch(`${this.SERVER}/${table}/${id}` , data)
    return {
      status:200,
      message: "Rekord módosítva",
      data : res.data
    }
    }
    catch (err : any){
      return {
        status:500,
        message: "Hiba történt az adatok módosításakor"
      }
    }
  }

  async Delete(table: string, id:number):Promise<apiRES>{
    try{
      const res = await axios.delete(`${this.SERVER}/${table}/${id}`)
    return {
      status:200,
      message: "Belo"
    }
    }
    catch (err : any){
      return {
        status:500,
        message: "Hiba történt az adatok lekéréskor"
      }
    }
  }

  async DeleteAll(table: string):Promise<apiRES>{
    try{
      const res = await axios.delete(`${this.SERVER}/${table}`)
    return {
      status:200,
      message : "Összes rekord törölve"
    }
    }
    catch (err : any){
      return {
        status:500,
        message: "Hiba történt az adatok lekéréskor"
      }
    }
  }
  async Registration(table: string, data: any){
    try{
      const res = await axios.post(`${this.SERVER}/${table}/registration` , data)
    return {
      status:200,
      message: "A regisztráció sikeres",
      data : res.data
    }
    }
    catch (err : any){
      return {
        status:500,
        message: err.response.data.error
        
      }
    }
  }
  async Login(table: string, data: any){
    try{
      const res = await axios.post(`${this.SERVER}/${table}/login` , data)
    return {
      status:200,
      message: "A bejelentkezés sikeres",
      data : res.data
    }
    }
    catch (err : any){
      return {
        status:500,
        message: err.response.data.error
        
      }
    }
  }
}