import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { Pizza } from '../../../interfaces/pizza';
import { enviroment } from '../../../../enviroments/enviroment';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { NumberFormatPipe } from "../../../pipes/number-format.pipe";
import { LightboxComponent } from "../../system/lightbox/lightbox.component";
declare var bootstrap: any;

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NumberFormatPipe,
    LightboxComponent
],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.scss'
})
export class PizzasComponent implements OnInit{
  selectedFile : File | null = null;
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  pagedPizza : Pizza[] = [];

  lightboxVisible = false
  lightBoxImg = ''
  
  startIndex = 0
  endIndex = 0


  formModal: any
  confirmModal : any

  editmode = false;

  currency = enviroment.currency

  pizzas: Pizza[] = []

  pizza: Pizza = {
    id: 0,
    name: '',
    descrip: '',
    image:'',
    calories: 0,
    price: 0
  };

  constructor(
    private Api: APIService,
    private msg: MessageService
  ){}


  ngOnInit(): void {
    this.formModal = new bootstrap.Modal('#formModal')
    this.confirmModal = new bootstrap.Modal('#confirmModal')
    this.getPizzas()
  }  

  getPizzas(){
    this.Api.SelectAll('pizzas').then(res =>{
      this.pizzas = res.data
      this.totalPages = Math.ceil(this.pizzas.length / this.pageSize)
      this.setPage(1)
    })
  }

  async save(){
    this.pizza.image = ''
    if ( this.pizza.name == ""|| this.pizza.calories == 0|| this.pizza.price == 0){
      this.msg.show('danger','Hiba','Nem adtál meg minden kötelező adatot!')
      return
    }
    if(this.selectedFile){
      const formData = new FormData();
      formData.append('image',this.selectedFile)
      await this.Api.Upload(formData).then(res => {
        if(res.status != 200){
          this.msg.show('danger','Hiba',res.message!)
          
        }
        else{
          console.log(res.data)
          this.pizza.image = res.data.filename
        }
       
      });
    }
    if(this.editmode){
      this.Api.SelectAll('pizzas/name/eq/'+this.pizza.name).then(res =>{
        if(res.data.length !=0 && res.data[0].id != this.pizza.id){
          this.msg.show('danger','Hiba','Van már ilyen nevű pizza!')
        return
        }
   

        this.Api.Update('pizzas', this.pizza.id,this.pizza).then(res=>{
          this.msg.show('success','OK',"Pizza sikeresen módosítva")
          this.formModal.hide()
          this.editmode = false;
          this.pizza = {
            id: 0,
            name: '',
            descrip: '',
            image:'',
            calories: 0,
            price: 0
          }
          this.getPizzas();
        })
      })
    }
    else{
      console.log(this.pizza.image)
      this.Api.SelectAll('pizzas/name/eq/'+this.pizza.name).then(res =>{
        if(res.data.length !=0){
          this.msg.show('danger','Hiba','Van már ilyen nevű pizza!')
        return
         
        }
        this.Api.Insert('pizzas',this.pizza).then(res =>{
          this.msg.show('success','OK',"A pizza hozzáadva!")
          this.formModal.hide();
          this.getPizzas()
          this.pizza = {
            id: 0,
            name: '',
            descrip: '',
            image:'',
            calories: 0,
            price: 0
          }
        });
      })
    }
    
  }
  delPizza(id: number){
    this.pizza.id = id;
    this.confirmModal.show()
  }
  delete(id:number){
    let pizza = this.pizzas.find(item => item.image != '' && item.id == id)
    if(pizza){
      this.Api.DelIMG(pizza.image!)
    }
    this.Api.Delete("pizzas", this.pizza.id).then(res=>{
      this.msg.show('success','OK',"Pizza sikeresen törölve!")
      this.confirmModal.hide()
      this.pizza = {
        id: 0,
        name: '',
        descrip: '',
        image:'',
        calories: 0,
        price: 0
      }
      this.getPizzas()
    })
  }

  setPage(page:number){
    
    this.currentPage = page;
    this.startIndex = (page -1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
    this.pagedPizza = this.pizzas.slice(this.startIndex,this.endIndex)
  }

  getPizza(id:number){
    this.Api.Select('pizzas', id).then(res =>{
      this.pizza = res.data[0];
      this.editmode = true;
      this.formModal.show();
    })
  }
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0]
  }
  deleteimg(filename : string, id:number){
    this.Api.DelIMG(filename).then(res =>{
      if(res.status == 200){
        this.pizza.image
        this.Api.Update('pizzas',id,this.pizza).then(res =>{
          this.msg.show('success', 'Ok', 'A kép törölve!')
        })
      }
    })
  }
  openLightbox(image: string){
    this.lightBoxImg = 'http://localhost:3000/uploads/'+image
    this.lightboxVisible = true
  }

  cancel(){
    this.pizza = {
      id: 0,
      name: '',
      descrip: '',
      image:'',
      calories: 0,
      price: 0
    }
    this.confirmModal.hide()
  }
}
