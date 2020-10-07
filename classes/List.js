export default class {
    constructor(name, items=[]) {
        this.name = name;
        this.items = items;
    }

    addItem(newItem) {
        for(let item of this.items){
            if(newItem.name === item.name){
                throw new Error("Cant add twice the same product")
            }
        }
        this.items.push(newItem);
    }

    deleteItem(item){
        let index = this.items.findIndex(element => element.name === item.name);
        this.items.splice(index, 1);
    }

    getTotal() {
        let total = 0;
        for (let item of items) {
            total += item.price * item.quantity;
        }
        return total;
    }

    getReadyTotal() {
        let total = 0;
        for (let item of items) {
            if (item.ready) {
                total += item.price * item.quantity;
            }
        }
        return total;
    }

    getReadyQuantity() {
        let readyItems = 0;
        for (let item of items) {
            if (item.ready) {
                readyItems++;
            }
        }
        return readyItems;
    }
}