import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {UserClass} from '../../../../../models/User';
import {AccordionModule} from '../primeng/primeng';     //accordion and accordion tab
import {MenuItem} from '../primeng/primeng';            //api
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {    
    username: String;
    firstName: String;
    lastName: String;
    businessName: String;
    password: String;
    email: String;
    displayDialog: boolean;
    user: UserClass = new PrimeUser();
    selectedUser: UserClass;
    plusUser: boolean;
    users: UserClass[];

  constructor(    
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
        this.authService.getUser().subscribe(users => {
      this.users = users;
    });
  }

    

    delete(id){
      var users = this.users;

      this.authService.deleteUser(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < users.length;i++){
            if(users[i]._id == id){
              users.splice(i,1);
            }
          }
        }
      });
    }

    showDialogToAdd(){
      this.plusUser = true;
      this.user = new PrimeUser();
      this.displayDialog = true;
    }


    save(){
      //var users = users;
      if(this.plusUser)
        this.authService.addUser(this.user)
            .subscribe(user => {
                this.users.push(user);
                this.username = '';
                this.firstName = '';
                this.lastName = '';
                this.businessName = '';
                this.password = '';
                this.email = '';
            });
      else 
        this.authService.save(this.user);
        
      this.user=null;
      this.displayDialog=false;
    }

    deleteUser(id){
      var users = this.users;

      this.authService.deleteUser(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < users.length;i++){
            if(users[i]._id == id){
              users.splice(i,1);
            }
          }
        }
      });
      this.user=null;
      this.displayDialog=false;
    }

    onRowSelect(event){
      this.plusUser = false;
      this.user = this.cloneUser(event.data);
      this.displayDialog=true;
    }

    cloneUser(u: UserClass): UserClass{
      let user = new PrimeUser();
      for(let prop in u){
        user[prop] = u[prop];
      }
      return user;
    }

    findSelectedUserIndex(): number{
      return this.users.indexOf(this.selectedUser);
    }



}

class PrimeUser implements UserClass {
  _id: string;
  username: String;
  firstName: String;
  lastName: String;
  businessName: String;
  password: String;
  email: String;


}