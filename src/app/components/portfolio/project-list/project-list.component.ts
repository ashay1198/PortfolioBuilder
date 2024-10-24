import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  displayedColumns: string[] = ['title', 'description', 'technologies', 'github_link', 'demo_link', 'category','actions'];
  dataSource = new MatTableDataSource<any>([]);
  searchControl = new FormControl('');


  constructor(private httpService: HttpService,public router: Router) {}

  ngOnInit(): void {
    this.getAllProjects();

    // Apply search filter
    this.searchControl.valueChanges.subscribe((value:any) => {
      this.dataSource.filter = value.trim().toLowerCase();
    });
  }


  getAllProjects(): void {
    this.httpService.callGetService(this.httpService.apiUrl+'/project/getAllProjects').subscribe((projects:any) => {
      this.dataSource.data = projects;
    });
  }

  editProject(project: any): void {
    this.router.navigate(['/addUpdateProjects', project.id]);
  }

  deleteProject(id: number): void {
    this.httpService.callDeleteService(this.httpService.apiUrl+'/project/deleteProjects/'+id).subscribe((project) => {
      this.getAllProjects();
   });
  }
}
