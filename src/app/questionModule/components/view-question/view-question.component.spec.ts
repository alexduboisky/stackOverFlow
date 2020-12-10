import {ViewQuestionComponent} from './view-question.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {RouterTestingModule} from '@angular/router/testing';
import {DatabaseService} from '../../../shared/services/database.service';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../shared/classes/question';
import {of} from 'rxjs';

describe('ViewQuestionComponent',()=>{

  let component: ViewQuestionComponent
  let fixture: ComponentFixture<ViewQuestionComponent>;
  let postService: DatabaseService;
  let authService: AuthService;
  let router: Router;
  let activatedRouter: ActivatedRoute;
  let question: Question

  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  const postServiceStub = {
    deletePost: ()=>{},
    getPost: (path)=>{}
  }

  const activatedRouteStub = {
    paramMap: {
      subscribe() {
        return of();
      }
    }
  };




  beforeEach(async(()=>{
      TestBed.configureTestingModule({
        imports:[AppModule, RouterTestingModule],
        declarations:[ViewQuestionComponent],
        providers: [{provide: DatabaseService, useValue: postServiceStub}, AuthService, {provide: Router, useValue: routerSpy}, {provide: ActivatedRoute, useValue: activatedRouteStub}]
      })
        .compileComponents()
  }))

  beforeEach(()=>{
    fixture = TestBed.createComponent(ViewQuestionComponent)
    component = fixture.componentInstance
    postService = fixture.debugElement.injector.get(DatabaseService);
    authService = fixture.debugElement.injector.get(AuthService);
    router = fixture.debugElement.injector.get(Router);
    activatedRouter = fixture.debugElement.injector.get(ActivatedRoute);

    fixture.detectChanges();
  });

  question = {
    key: 'sodf08934fm',
    title: 'asd',
    author: 'asd',
    date: '13513511',
    text: 'asd',
    category: [{},{}],
    solved: false,
    approved: false,
    comments: []
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('editQuestion',()=>{
    it('should navigate to editQuestionComponent', function() {
      component.editQuestion(question)
      expect (routerSpy.navigate).toHaveBeenCalledWith([`/editQuestion/${question.key}`]);
    });
  })

})

