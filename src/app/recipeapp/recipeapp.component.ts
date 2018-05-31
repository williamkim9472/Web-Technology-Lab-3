import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recipeapp',
  templateUrl: './recipeapp.component.html',
  styleUrls: ['./recipeapp.component.css']
})
export class RecipeappComponent implements OnInit {

  //Recipe Example
  newIngredient1 = new item ("apple", 8);
  newIngredient2 = new item ("egg", 3);
  newIngredient3 = new item ("bread", 2);
  newIngredient4 = new item ("banana", 3);
  newIngredient5 = new item ("lettuce", 1);

  newInstruction1 = "cut apples to small pieces";
  newInstruction2 = "mix apples with eggs";
  newInstruction3 = "bake it";
  newInstruction4 = "either boil or fry eggs";
  newInstruction5 = "put them between breads";
  newInstruction6 = "cut fruits and lettuce to small pieces";
  newInstruction7 = "mix them";

  recipeMenu : Array<recipe> = [
    new recipe ("Apple Pie", [this.newIngredient1, this.newIngredient2], [this.newInstruction1, this.newInstruction2, this.newInstruction3], 30),
    new recipe ("Egg Sandwich", [this.newIngredient2, this.newIngredient3], [this.newInstruction4, this.newInstruction5], 10),
    new recipe ("Fruit Salad", [this.newIngredient1, this.newIngredient4, this.newIngredient5], [this.newInstruction6, this.newInstruction7], 2)
  ];

  //new edit recipe object
  newRecipe: recipe = new recipe("", [new item ("",0)], [""], 0);
  
  //new select recipe object
  selectedItem : recipe = null;

  constructor() { }

  ngOnInit() {
  }

  //add recipe method
  addRecipe() {
    let newRecipeEmpty1 : recipe = new recipe("New Recipe", [new item ("",0)], [""], 0);
    let newRecipeEmpty2 : recipe = new recipe("New Recipe", [new item ("",0)], [""], 0);
    this.selectedItem = newRecipeEmpty1;
    this.newRecipe = newRecipeEmpty2;
    this.recipeMenu.push(this.selectedItem);
  }

  //select recipe method
  selectRecipe(recipe) {
    this.selectedItem = recipe;
    this.newRecipe.recipeName = this.selectedItem.recipeName;
    let j = 0;
    for (let i = 0; i < this.selectedItem.ingredients.length; i++) {
      if (j > 0) {
        this.newRecipe.ingredients.push(new item ("",0));
      }
      this.newRecipe.ingredients[i].itemName = this.selectedItem.ingredients[i].itemName;
      this.newRecipe.ingredients[i].itemQuantity = this.selectedItem.ingredients[i].itemQuantity;
      j++;
    }
    for (let i = 0; i < this.selectedItem.instructions.length; i++) {
      this.newRecipe.instructions[i] = this.selectedItem.instructions[i];
    }
    this.newRecipe.estimatedTime = this.selectedItem.estimatedTime;
  }

  //delete recipe method
  deleteRecipe() {
    for (let i = 0; i < this.recipeMenu.length; i++) {
      if (this.recipeMenu[i] == this.selectedItem) {
        this.recipeMenu.splice(i, 1);
      }
    }
    this.selectedItem = null;
  }

  //edit recipe method
  editRecipe() {
    this.selectedItem.recipeName = this.newRecipe.recipeName;
    for (let i = 0; i < this.selectedItem.ingredients.length; i++) {
      this.selectedItem.ingredients[i].itemName = this.newRecipe.ingredients[i].itemName;
      this.selectedItem.ingredients[i].itemQuantity = this.newRecipe.ingredients[i].itemQuantity;
    }
    for (let i = 0; i < this.selectedItem.instructions.length; i++) {
      this.selectedItem.instructions[i] = this.newRecipe.instructions[i];
    }
    this.selectedItem.estimatedTime = this.newRecipe.estimatedTime;
  }

  //method to add instruction to new or currently editing recipe
  addInstruction() {
    this.selectedItem.instructions.push("");
    this.newRecipe.instructions.push("");
  }

  //method to add ingredient to new or currently editing recipe
  addIngredient() {
    let emptyItem = new item ("", 0);
    let emptyItem2 = new item ("", 0);
    this.selectedItem.ingredients.push(emptyItem);
    this.newRecipe.ingredients.push(emptyItem2);
  }

  //method to remove instruction from new or currently editing recipe
  removeInstruction() {
    if (this.selectedItem.instructions.length > 1) {
      this.selectedItem.instructions.pop();
      this.newRecipe.instructions.pop();
    }
  }

  //method to remove ingredient from new or currently editing recipe
  removeIngredient() {
    if (this.selectedItem.ingredients.length > 1) {
      this.selectedItem.ingredients.pop();
      this.newRecipe.ingredients.pop();
    }
  }
}

// classes from previous lab
export class item {
  
  constructor(public itemName : string, public itemQuantity : number) {
  }
}


export class recipe {

  addItem(newItem : item) {
      this.ingredients.push(newItem);
  }

  addInstruction(newInstruction : string) {
      this.instructions.push(newInstruction);
  }

  constructor(public recipeName : String, public ingredients : Array<item>, public instructions : Array<string>, public estimatedTime : number) {
  }
}

