export default class {
    constructor(name) {
        this.name = name;
        this.items = [];
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