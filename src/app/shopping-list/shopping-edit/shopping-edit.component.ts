import { ShoppingListService } from './../shopping-list.service';
import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.mode';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing
    .subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onSubmited(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient
    (
      value.name,
      value.amount
    );
    if(this.editMode){
      this.shoppingListService.updadeIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
