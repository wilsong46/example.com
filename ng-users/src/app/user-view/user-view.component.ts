import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  user: User;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  getUser(id): void {
    this.usersService.getUser(id).subscribe(
      (response:any) => {
        this.user = response.user
      }
    );
  }
  //3. Implement the deleteUser() method
deleteUser(id: string): void {
  if(confirm("Are you sure to delete " + this.user.username)) {
    this.usersService.deleteUser(id).subscribe(
      ()=>{this.router.navigate(['/users'])}
      );
    }
  }
}