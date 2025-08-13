import { DataStorageService } from './../shared/data-storage.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipesService } from './recipes.service';
import { inject } from '@angular/core';

export const RecipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const recipes = inject(RecipesService).getRecipes();
  if (recipes.length === 0) {
    return inject(DataStorageService).fetchRecipes();
  } else {
    return recipes;
  }
};
