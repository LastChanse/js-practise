class CartService {
    constructor() {
        this.cart = {}
    }

    add(product) {
        const key = product.id
    
        if (this.cart[key]) {
            this.cart[key].amount++
            return // Прекращаем выполнение
        }
        this.cart[key] = {
            title: product.title,
            price: product.price,
            amount: 1
        }
    }

    remove(productId) {
        const amount = this.cart[productId].amount
        if (amount <= 1) {
            delete this.cart[productId]
        } else {
            this.cart[productId].amount--;
        }
    }

    clear() {
        this.cart = {}
    }

    getInfo() {
        const items = Object.keys(this.cart).map(id => {
            return {
                id,
                ...this.cart[id]
            }
        })
    
        const totalPrice = items.reduce((sum, item) => sum += item.amount * item.price, 0)
    
        return { items, totalPrice }
    }
}