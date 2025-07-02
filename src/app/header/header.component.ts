import { RecipeService } from './../recipes/recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService){}

  onSaveData(){
    this.dataStorageService.storeRecipes();
    console.log("leo component " + this.dataStorageService.storeRecipes());
  }


  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
