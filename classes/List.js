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

    updateItem(oldItem, newItem) {
        let itemIndex = this.items.findIndex(e => e.name === oldItem.name);
        this.items[itemIndex] = newItem;
    }

    getTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price * item.quantity;
        }
        return total;
    }

    getReadyTotal() {
        let total = 0;
        for (let item of this.items) {
            if (item.ready) {
                total += item.price * item.quantity;
            }
        }
        return total;
    }
}