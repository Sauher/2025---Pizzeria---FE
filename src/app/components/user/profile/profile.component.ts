import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    constructor(
      private api: APIService
    ){}

    updateUser: User={
      name: '',
      email: '',
      password: '',
      confirm: '',
      role: 'user'
  }
  
  profUpdate(){
      
  }
}
