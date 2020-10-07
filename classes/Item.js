export default class {
    constructor(name, price, quantity) {
        this.setName(name);
        this.setPrice(price);
        this.setQuantity(quantity);
    }

    setName(name) {
        if (name.length === 0) throw new Error("Cant create list without name");
        this.name = name;
    }

    setPrice(price) {
        if (price < 0) throw new Error("Cant create item with negative price");
        this.price = price;
    }

    setQuantity(quantity) {
        if (quantity < 0) throw new Error("Cant create item with negative quantity");
        this.quantity = quantity;
    }

    getSubtotal() {
        return this.price * this.quantity;
    }
} 