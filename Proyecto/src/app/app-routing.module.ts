import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';  // Import the routes from app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],  // Use hash strategy if deploying on GitHub Pages
  exports: [RouterModule]
})
export class AppRoutingModule {}