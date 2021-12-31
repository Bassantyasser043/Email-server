import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ComposeComponent } from './compose/compose.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { DraftComponent } from './draft/draft.component';
import { SentComponent } from './sent/sent.component';
import { TrashComponent } from './trash/trash.component';
import { ContactviewComponent } from './contactview/contactview.component';
import { FoldersComponent } from './folders/folders.component';
const routes: Routes = [
  {path: '',   redirectTo: 'signin', pathMatch: 'full' }, // redirect to `first-component`
  {path:'signin', component:SigninComponent},
  {path:'signup' ,component:SignupComponent},
  {path:'home' ,component:HomeComponent},
  
  {path:'compose' ,component:ComposeComponent},
  {path:'addcontact' ,component:AddcontactComponent},
  {path:'trash' ,component:TrashComponent},
  {path:'draft' ,component:DraftComponent},
  {path:'sent' ,component:SentComponent},
  {path:'contactview' ,component:ContactviewComponent},
  {path:'folder' ,component:FoldersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[SigninComponent,HomeComponent,SignupComponent,ComposeComponent,FoldersComponent,AddcontactComponent,DraftComponent,SentComponent,TrashComponent,ContactviewComponent]