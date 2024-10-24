import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEditMode: boolean = false;
  projectId: any = null;

  categories: string[] = ['Web Development', 'Data Science', 'Mobile App', 'Machine Learning']; // Add more categories as needed

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    debugger
    if (this.projectId!=0) {
      this.isEditMode = true;
      this.loadProject(this.projectId);
    }
  }

  initializeForm(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      technologies: ['', Validators.required],
      github_link: ['', Validators.required],
      demo_link: ['', Validators.required],
      images: [''], // Optional array for images
      category: ['', Validators.required]
    });
  }

  loadProject(id: string): void {
    this.httpService.callGetService(this.httpService.apiUrl+'/project/getProjectByID/'+id).subscribe((project) => {
      this.projectForm.patchValue(project);
    });
  }

  onSubmit(): void {
    var id
    if (this.projectForm.valid) {
      const formValues = this.projectForm.value;
      const request = {
        "title": formValues.title, 
        "description": formValues.description, 
        "technologies": formValues.technologies,
        "github_link": formValues.github_link,
        "demo_link": formValues.demo_link,
        "category": formValues.category,
        "image": ''
      }
      if (!this.isEditMode) {
        this.httpService.callPostService(this.httpService.apiUrl+'/project/addProjects', request).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      } else {
        this.httpService.callPostService(this.httpService.apiUrl+'/project/updateProjects/'+id,request).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      }
    }
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    const filesArray: string[] = [];
  
    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        filesArray.push(e.target.result); // Convert to base64 or use a different method to handle images
        this.projectForm.patchValue({ images: filesArray });
      };
      reader.readAsDataURL(fileList[i]); // Reading as base64
    }
  }
}
