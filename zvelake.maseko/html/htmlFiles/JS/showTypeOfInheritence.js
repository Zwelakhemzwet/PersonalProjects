class Parent{
    constructor(name){
        this.name = name;
    }
    showType(){
        console.log("current class type: ");//edit so it shows a type
        console.log(this.name);
    }
}

class Child extends Parent{
    constructor(name){
        super("parent");
        this.name = name;
    }
}

const child = new Child("child");
child.showType();