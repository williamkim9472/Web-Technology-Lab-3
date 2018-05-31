import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeappComponent, item, recipe } from './recipeapp.component';
import { FormsModule } from '@angular/forms';

describe('RecipeappComponent', () => {
  let component: RecipeappComponent;
  let fixture: ComponentFixture<RecipeappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeappComponent ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('app created', () => {
    expect(component).toBeTruthy();
  });
});


describe("Check addRecipe (without UI)", () => {
  let component: RecipeappComponent;

  beforeEach(() => {
    component = new RecipeappComponent();
  })

  it("Test addRecipe method", () => {

    //check initial length of array recipeMenu
    expect(component.recipeMenu.length).toBe(3);

    //call addRecipe method
    component.addRecipe();

    //check newRecipe, selectedItem and new object in recipeMenu array have same properties
    expect(component.newRecipe.recipeName).toBe("New Recipe");
    expect(component.newRecipe.ingredients[0].itemName).toBe("");
    expect(component.newRecipe.ingredients[0].itemQuantity).toBe(0);
    expect(component.newRecipe.instructions[0]).toBe("");
    expect(component.newRecipe.estimatedTime).toBe(0);

    expect(component.selectedItem.recipeName).toBe("New Recipe");
    expect(component.selectedItem.ingredients[0].itemName).toBe("");
    expect(component.selectedItem.ingredients[0].itemQuantity).toBe(0);
    expect(component.selectedItem.instructions[0]).toBe("");
    expect(component.selectedItem.estimatedTime).toBe(0);

    expect(component.recipeMenu[3].recipeName).toBe("New Recipe");
    expect(component.recipeMenu[3].ingredients[0].itemName).toBe("");
    expect(component.recipeMenu[3].ingredients[0].itemQuantity).toBe(0);
    expect(component.recipeMenu[3].instructions[0]).toBe("");
    expect(component.recipeMenu[3].estimatedTime).toBe(0);

    //check new length of array recipeMenu after addRecipe method
    expect(component.recipeMenu.length).toBe(4);
  })
});


describe("Check selectRecipe (without UI)", () => {
  let component: RecipeappComponent;

  beforeEach(() => {
    component = new RecipeappComponent();
  })

  it("Test selectRecipe method", () => {
    let selectRecipeTest = new recipe("Boiled Egg", [new item ("Egg", 1), new item ("Salt", 2)], ["Boil Egg", "Eat it", "Be happy"], 7);

    //call selectRecipe method
    component.selectRecipe(selectRecipeTest);
    expect(component.selectedItem).toBe(selectRecipeTest);

    //check newRecipe has same properties as selectedItem
    expect(component.newRecipe.recipeName).toBe(component.selectedItem.recipeName);
    for (let i = 0; i < component.selectedItem.ingredients.length; i++) {
      expect(component.newRecipe.ingredients[i].itemName).toBe(component.selectedItem.ingredients[i].itemName);
      expect(component.newRecipe.ingredients[i].itemQuantity).toBe(component.selectedItem.ingredients[i].itemQuantity);
    }
    for (let i = 0; i < component.selectedItem.instructions.length; i++) {
      expect(component.newRecipe.instructions[i]).toBe(component.selectedItem.instructions[i]);
    }
    expect(component.newRecipe.estimatedTime).toBe(component.selectedItem.estimatedTime);

    //check newRecipe has same properties as selectRecipeTest
    expect(component.newRecipe.recipeName).toBe("Boiled Egg");
    expect(component.newRecipe.ingredients[0].itemName).toBe("Egg");
    expect(component.newRecipe.ingredients[0].itemQuantity).toBe(1);
    expect(component.newRecipe.ingredients[1].itemName).toBe("Salt");
    expect(component.newRecipe.ingredients[1].itemQuantity).toBe(2);
    expect(component.newRecipe.instructions[0]).toBe("Boil Egg");
    expect(component.newRecipe.instructions[1]).toBe("Eat it");
    expect(component.newRecipe.instructions[2]).toBe("Be happy");
    expect(component.newRecipe.estimatedTime).toBe(7);
  })
});


describe("Check deleteRecipe (without UI)", () => {
  let component: RecipeappComponent;

  beforeEach(() => {
    component = new RecipeappComponent();
  })

  it("Test deleteRecipe method", () => {
    //check initial length of recipeMenu array and property of first object in the array
    expect(component.recipeMenu[0].recipeName).toBe("Apple Pie");
    expect(component.recipeMenu.length).toBe(3);
    
    //simulate selection of first object in recipeMenu array
    component.selectedItem = component.recipeMenu[0];
    component.newRecipe = component.recipeMenu[0];

    //call deleteRecipe method
    component.deleteRecipe();

    //check new length of recipeMenu and property of first object in the array after deleteRecipe method
    expect(component.recipeMenu[0].recipeName).toBe("Egg Sandwich");
    expect(component.recipeMenu.length).toBe(2);
  })
});


describe("Check editRecipe (without UI)", () => {
  let component: RecipeappComponent;

  beforeEach(() => {
    component = new RecipeappComponent();
  })

  it("Test editRecipe method", () => {
    //simulate selection of recipe
    component.selectedItem = new recipe("New Recipe", [new item ("",0)], [""], 0);
    component.newRecipe = new recipe("New Recipe", [new item ("",0)], [""], 0);

    //call addIngredient method and addInstruction method to increase the size of array properties in selected recipe
    component.addIngredient();
    component.addInstruction();
    component.addInstruction();

    //simulate update of values in the html input type attributes
    component.newRecipe = new recipe("Boiled Egg", [new item ("Egg", 1), new item ("Salt", 2)], ["Boil Egg", "Eat it", "Be happy"], 7);

    //call editRecipe method
    component.editRecipe();

    //check selectedItem is properly updated with values from newRecipe
    expect(component.selectedItem.recipeName).toBe("Boiled Egg");
    expect(component.selectedItem.ingredients[0].itemName).toBe("Egg");
    expect(component.selectedItem.ingredients[0].itemQuantity).toBe(1);
    expect(component.selectedItem.ingredients[1].itemName).toBe("Salt");
    expect(component.selectedItem.ingredients[1].itemQuantity).toBe(2);
    expect(component.selectedItem.instructions[0]).toBe("Boil Egg");
    expect(component.selectedItem.instructions[1]).toBe("Eat it");
    expect(component.selectedItem.instructions[2]).toBe("Be happy");
    expect(component.selectedItem.estimatedTime).toBe(7);
  })
});


describe("Check addInstruction and removeInstruction (without UI)", () => {
  let component: RecipeappComponent;

  beforeEach(() => {
    component = new RecipeappComponent();
  })

  it("Test addInstruction and removeInstruction method", () => {
    //simulate selection of recipe
    component.selectedItem = new recipe("Boiled Egg", [new item ("Egg", 1), new item ("Salt", 2)], ["Boil Egg", "Eat it", "Be happy"], 7);
    component.newRecipe = new recipe("Boiled Egg", [new item ("Egg", 1), new item ("Salt", 2)], ["Boil Egg", "Eat it", "Be happy"], 7);

    //check initial value and length of properties
    expect(component.selectedItem.instructions[2]).toBe("Be happy");
    expect(component.newRecipe.instructions[2]).toBe("Be happy");
    expect(component.selectedItem.instructions.length).toBe(3);
    expect(component.newRecipe.instructions.length).toBe(3);
    
    //call addInstruction method
    component.addInstruction();

    //check new value and length of properties after addInstruction method
    expect(component.selectedItem.instructions[3]).toBe("");
    expect(component.newRecipe.instructions[3]).toBe("");
    expect(component.selectedItem.instructions.length).toBe(4);
    expect(component.newRecipe.instructions.length).toBe(4);

    //call removeInstruction method twice
    component.removeInstruction();
    component.removeInstruction();

    ////check new value and length of properties after removeInstruction method
    expect(component.selectedItem.instructions[2]).toBe(undefined);
    expect(component.newRecipe.instructions[2]).toBe(undefined);
    expect(component.selectedItem.instructions.length).toBe(2);
    expect(component.newRecipe.instructions.length).toBe(2);
  })
});


describe("Check addIngredient and removeIngredient (without UI)", () => {
  let component: RecipeappComponent;

  beforeEach(() => {
    component = new RecipeappComponent();
  })

  it("Test addIngredient and removeIngredient method", () => {
    //simulate selection of recipe
    component.selectedItem = new recipe("Boiled Egg", [new item ("Egg", 1), new item ("Salt", 2)], ["Boil Egg", "Eat it", "Be happy"], 7);
    component.newRecipe = new recipe("Boiled Egg", [new item ("Egg", 1), new item ("Salt", 2)], ["Boil Egg", "Eat it", "Be happy"], 7);
  
    //check initial value and length of properties
    expect(component.selectedItem.ingredients[1].itemName).toBe("Salt");
    expect(component.selectedItem.ingredients[1].itemQuantity).toBe(2);
    expect(component.newRecipe.ingredients[1].itemName).toBe("Salt");
    expect(component.newRecipe.ingredients[1].itemQuantity).toBe(2);
    expect(component.selectedItem.ingredients.length).toBe(2);
    expect(component.newRecipe.ingredients.length).toBe(2);

    //call addIngredient method
    component.addIngredient();

    //check new value and length of properties after addIngredient method
    expect(component.selectedItem.ingredients[2].itemName).toBe("");
    expect(component.selectedItem.ingredients[2].itemQuantity).toBe(0);
    expect(component.newRecipe.ingredients[2].itemName).toBe("");
    expect(component.newRecipe.ingredients[2].itemQuantity).toBe(0);
    expect(component.selectedItem.ingredients.length).toBe(3);
    expect(component.newRecipe.ingredients.length).toBe(3);

    //call removeIngredient method twice
    component.removeIngredient();
    component.removeIngredient();

    //check new value and length of properties after removeIngredient method
    expect(component.selectedItem.ingredients[1]).toBe(undefined);
    expect(component.selectedItem.ingredients[1]).toBe(undefined);
    expect(component.newRecipe.ingredients[1]).toBe(undefined);
    expect(component.newRecipe.ingredients[1]).toBe(undefined);
    expect(component.selectedItem.ingredients.length).toBe(1);
    expect(component.newRecipe.ingredients.length).toBe(1);
  })
});


describe("Check addRecipe method using UI", () => {
  let component: RecipeappComponent;
  let fixture: ComponentFixture<RecipeappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeappComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("Test addRecipe method using UI", () => {
    let newElement: HTMLElement = fixture.debugElement.nativeElement;

    //check initial length of recipeMenu array
    expect(component.recipeMenu.length).toBe(3);

    //simulate clicking of addRecipe button
    let addRecipeButton = newElement.querySelector("#addRecipeButton");
    addRecipeButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    //check new length of recipeMenu array
    expect(component.recipeMenu.length).toBe(4);

    //check newRecipe, selectedItem and new object in recipeMenu array have same properties
    expect(component.newRecipe.recipeName).toBe("New Recipe");
    expect(component.newRecipe.ingredients[0].itemName).toBe("");
    expect(component.newRecipe.ingredients[0].itemQuantity).toBe(0);
    expect(component.newRecipe.instructions[0]).toBe("");
    expect(component.newRecipe.estimatedTime).toBe(0);

    expect(component.selectedItem.recipeName).toBe("New Recipe");
    expect(component.selectedItem.ingredients[0].itemName).toBe("");
    expect(component.selectedItem.ingredients[0].itemQuantity).toBe(0);
    expect(component.selectedItem.instructions[0]).toBe("");
    expect(component.selectedItem.estimatedTime).toBe(0);

    expect(component.recipeMenu[3].recipeName).toBe("New Recipe");
    expect(component.recipeMenu[3].ingredients[0].itemName).toBe("");
    expect(component.recipeMenu[3].ingredients[0].itemQuantity).toBe(0);
    expect(component.recipeMenu[3].instructions[0]).toBe("");
    expect(component.recipeMenu[3].estimatedTime).toBe(0);

    //bring attributes from html by their id
    let selectedRecipeName = newElement.querySelector("#selectedRecipeName");
    let selectedIngredients = newElement.querySelector("#selectedIngredients0");
    let selectedInstructions = newElement.querySelector("#selectedInstructions0");
    let selectedEstimatedTime = newElement.querySelector("#selectedEstimatedTime");
    
    //check each attribute has expected value
    expect(selectedRecipeName.innerHTML).toBe("New Recipe");
    expect(selectedIngredients.innerHTML).toBe(", 0");
    expect(selectedInstructions.innerHTML).toBe("");
    expect(selectedEstimatedTime.innerHTML).toBe("0");

    // check .selected class is applied to new recipe
    let selectedColor = newElement.querySelector("#recipeList3");
    expect(selectedColor.classList).toContain("selected");
  })
});


describe("Check selectRecipe method using UI", () => {
  let component: RecipeappComponent;
  let fixture: ComponentFixture<RecipeappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeappComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("Test selectRecipe method using UI", () => {
    let newElement: HTMLElement = fixture.debugElement.nativeElement;

    //simulate selection of recipe
    component.selectedItem = component.recipeMenu[0];
    component.newRecipe = component.recipeMenu[0];

    //detect changes within html
    fixture.detectChanges();

    //bring attributes from html by their id
    let SelectedRecipe1 = newElement.querySelector("#recipeList0");

    //check the selected attribute has .selected class
    expect(SelectedRecipe1.classList).toContain("selected");

    //simulate selection of different recipe
    component.selectedItem = component.recipeMenu[2];
    component.newRecipe = component.recipeMenu[2];
    fixture.detectChanges();
    let SelectedRecipe2 = newElement.querySelector("#recipeList2");

    //check newly selected attribute has .selected class
    expect(SelectedRecipe2.classList).toContain("selected");
  })
});


describe("Check deleteRecipe method using UI", () => {
  let component: RecipeappComponent;
  let fixture: ComponentFixture<RecipeappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeappComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("Test deleteRecipe method using UI", () => {
    let newElement: HTMLElement = fixture.debugElement.nativeElement;

    component.selectedItem = component.recipeMenu[0];
    component.newRecipe = component.recipeMenu[0];

    expect(component.recipeMenu.length).toBe(3);
    expect(component.selectedItem.recipeName).toBe("Apple Pie");
    expect(component.recipeMenu[0].recipeName).toBe("Apple Pie");

    fixture.detectChanges();
    let SelectedRecipe1 = newElement.querySelector("#recipeList0");
    expect(SelectedRecipe1.classList).toContain("selected");

    //simulate clicking of deleteRecipe button
    let deleteRecipeButton = newElement.querySelector("#deleteRecipeButton");
    deleteRecipeButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    //check length of array is shorter and initially selected object is removed from the array
    expect(component.recipeMenu.length).toBe(2);
    expect(component.selectedItem).toBe(null);
    expect(component.recipeMenu[0].recipeName).toBe("Egg Sandwich");
    let SelectedRecipe2 = newElement.querySelector("#recipeList0");
    expect(SelectedRecipe2.classList).not.toContain("selected");
  })
});


describe("Check editRecipe method using UI", () => {
  let component: RecipeappComponent;
  let fixture: ComponentFixture<RecipeappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeappComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("Test editRecipe method using UI", () => {
    let newElement: HTMLElement = fixture.debugElement.nativeElement;

    component.selectedItem = component.recipeMenu[0];
    component.newRecipe = component.recipeMenu[0];

    expect(component.recipeMenu[0].recipeName).toBe("Apple Pie");
    expect(component.recipeMenu[0].ingredients[0].itemName).toBe("apple");
    expect(component.recipeMenu[0].ingredients[0].itemQuantity).toBe(8);
    expect(component.recipeMenu[0].ingredients[1].itemName).toBe("egg");
    expect(component.recipeMenu[0].ingredients[1].itemQuantity).toBe(3);
    expect(component.recipeMenu[0].instructions[0]).toBe("cut apples to small pieces");
    expect(component.recipeMenu[0].instructions[1]).toBe("mix apples with eggs");
    expect(component.recipeMenu[0].instructions[2]).toBe("bake it");
    expect(component.recipeMenu[0].estimatedTime).toBe(30);

    //simulate update of values in the html input type attributes
    component.newRecipe = new recipe("Boiled Egg", [new item ("egg", 1), new item ("salt", 2)], ["boil egg", "put salt", "eat it"], 7);

    //simulate clicking of editRecipe button
    let editRecipeButton = newElement.querySelector("#editRecipeButton");
    editRecipeButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    //check selected object's properties are update with values from html input type attributes
    expect(component.recipeMenu[0].recipeName).toBe("Boiled Egg");
    expect(component.recipeMenu[0].ingredients[0].itemName).toBe("egg");
    expect(component.recipeMenu[0].ingredients[0].itemQuantity).toBe(1);
    expect(component.recipeMenu[0].ingredients[1].itemName).toBe("salt");
    expect(component.recipeMenu[0].ingredients[1].itemQuantity).toBe(2);
    expect(component.recipeMenu[0].instructions[0]).toBe("boil egg");
    expect(component.recipeMenu[0].instructions[1]).toBe("put salt");
    expect(component.recipeMenu[0].instructions[2]).toBe("eat it");
    expect(component.recipeMenu[0].estimatedTime).toBe(7);
  })
});


describe("Check add and remove instructions methods using UI", () => {
  let component: RecipeappComponent;
  let fixture: ComponentFixture<RecipeappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeappComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("Test add and remove instructions methods using UI", () => {
    let newElement: HTMLElement = fixture.debugElement.nativeElement;
    
    component.selectedItem = component.recipeMenu[0];
    component.newRecipe = JSON.parse(JSON.stringify(component.selectedItem));

    //check initial value and length of properties
    expect(component.recipeMenu[0].instructions[0]).toBe("cut apples to small pieces");
    expect(component.recipeMenu[0].instructions[1]).toBe("mix apples with eggs");
    expect(component.recipeMenu[0].instructions[2]).toBe("bake it");
    expect(component.recipeMenu[0].instructions.length).toBe(3);

    //simulate clicking of addInstruction button
    let addInstructionButton = newElement.querySelector("#addInstructionButton");
    addInstructionButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    //check new value and length of properties after addInstruction button click
    expect(component.recipeMenu[0].instructions[0]).toBe("cut apples to small pieces");
    expect(component.recipeMenu[0].instructions[1]).toBe("mix apples with eggs");
    expect(component.recipeMenu[0].instructions[2]).toBe("bake it");
    expect(component.recipeMenu[0].instructions[3]).toBe("");
    expect(component.recipeMenu[0].instructions.length).toBe(4);

    //simulate clicking of removeInstruction button twice
    let removeInstructionButton1 = newElement.querySelector("#removeInstructionButton");
    removeInstructionButton1.dispatchEvent(new Event("click"));
    let removeInstructionButton2 = newElement.querySelector("#removeInstructionButton");
    removeInstructionButton2.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    //check new value and length of properties after removeInstruction button click
    expect(component.recipeMenu[0].instructions[0]).toBe("cut apples to small pieces");
    expect(component.recipeMenu[0].instructions[1]).toBe("mix apples with eggs");
    expect(component.recipeMenu[0].instructions[2]).toBe(undefined);
    expect(component.recipeMenu[0].instructions[3]).toBe(undefined);
    expect(component.recipeMenu[0].instructions.length).toBe(2);
  })
});


describe("Check add and remove ingredients methods using UI", () => {
  let component: RecipeappComponent;
  let fixture: ComponentFixture<RecipeappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeappComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("Test add and remove ingredients methods using UI", () => {
    let newElement: HTMLElement = fixture.debugElement.nativeElement;
    
    component.selectedItem = component.recipeMenu[0];
    component.newRecipe = JSON.parse(JSON.stringify(component.selectedItem));

    //check initial value and length of properties
    expect(component.recipeMenu[0].ingredients[0].itemName).toBe("apple");
    expect(component.recipeMenu[0].ingredients[0].itemQuantity).toBe(8);
    expect(component.recipeMenu[0].ingredients[1].itemName).toBe("egg");
    expect(component.recipeMenu[0].ingredients[1].itemQuantity).toBe(3);
    expect(component.recipeMenu[0].ingredients.length).toBe(2);

    //simulate clicking of addIngredient button
    let addIngredientnButton = newElement.querySelector("#addIngredientButton");
    addIngredientnButton.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    //check new value and length of properties after addIngredient button
    expect(component.recipeMenu[0].ingredients[0].itemName).toBe("apple");
    expect(component.recipeMenu[0].ingredients[0].itemQuantity).toBe(8);
    expect(component.recipeMenu[0].ingredients[1].itemName).toBe("egg");
    expect(component.recipeMenu[0].ingredients[1].itemQuantity).toBe(3);
    expect(component.recipeMenu[0].ingredients[2].itemName).toBe("");
    expect(component.recipeMenu[0].ingredients[2].itemQuantity).toBe(0);
    expect(component.recipeMenu[0].ingredients.length).toBe(3);

    //simulate clicking of removeIngredient button twice
    let removeIngredientnButton1 = newElement.querySelector("#removeIngredientButton");
    removeIngredientnButton1.dispatchEvent(new Event("click"));
    let removeIngredientnButton2 = newElement.querySelector("#removeIngredientButton");
    removeIngredientnButton2.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    //check new value and length of properties after removeIngredient button
    expect(component.recipeMenu[0].ingredients[0].itemName).toBe("apple");
    expect(component.recipeMenu[0].ingredients[0].itemQuantity).toBe(8);
    expect(component.recipeMenu[0].ingredients[1]).toBe(undefined);
    expect(component.recipeMenu[0].ingredients[2]).toBe(undefined);
    expect(component.recipeMenu[0].ingredients.length).toBe(1);
  })
});