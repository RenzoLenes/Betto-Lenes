class Product{
    constructor(code,name,price,quantity){
        this.code=code;
        this.name=name;
        this.price=price;
        this.quantity=quantity;
    }

    getCode(){
        return this.code;
    }
    getName(){
        return this.name;
    }
    getPrice(){
        return this.price;
    }
    getQuantity(){
        return this.quantity;
    }
    setPrice(newPrice) {
        this.price = newPrice;
    }
    
    setQuantity(newQuantity) {
        this.quantity = newQuantity;
    }
    getTotalValue() {
        return this.price * this.quantity;
    }
    printDetails() {
        console.log(`Code: ${this.code}`);
        console.log(`Name: ${this.name}`);
        console.log(`Price: $${this.price}`);
        console.log(`Quantity: ${this.quantity}`);
        console.log(`Total Value: $${this.getTotalValue()}`);
    }
            
}