let productService
const cartService = new CartService()
const htmlService = new HTMLService()
const messageService = new MessageService()

const productsContainer = document.getElementById('products')
const cartContainer = document.getElementById('cart')
const filterInput = document.getElementById('filter')

filterInput.addEventListener('input', event => {
    const value = event.target.value

    const filteredProducts = productService.filterBy(value)

    renderProducts(filteredProducts)
})

productsContainer.addEventListener('click', event => {
    const id = event.target.dataset.id // Если есть
        ? event.target.dataset.id // Берём айди
        : event.target.closest('li')?.dataset.id // Иначе берём ближайший айди в теге li
    //                         /\ Если даже этого нет, то ладно
    if (id) { // Если айди всётаки есть, добавляем в корзину
        cartService.add(
            productService.getById(+id) // id === "1" меняем +id === 1
        )
        renderCart()
    } // Иначе ничё не делаем
})

cartContainer.addEventListener('click', event => {
    const type = event.target?.dataset.type // Берём значение data-type из нажатаго элемента
        //  /\ если он есть
        // Чтобы при нажатии на вложенные в тег li элементы работало удаление
        // Напишем следующий код
        ? event.target.dataset.type
        : event.target.closest('li')?.dataset.type

    const id = event.target?.dataset.id
        // Чтобы при нажатии на вложенные в тег li элементы работало удаление
        // Напишем следующий код
        ? event.target.dataset.id
        : event.target.closest('li')?.dataset.id

    switch (type) { // Переключатель выполняет действие в зависимости от значения
        case 'clear':
            cartService.clear()
            renderCart()
            messageService.send("Все товары были удалены из корзины")
            return
        case 'remove':
            cartService.remove(id)
            renderCart()
            return
        case 'removeAll':
            delete cartService.cart[id]
            renderCart()
            return
    }
})

function renderProducts(products) {
    productsContainer.innerHTML = htmlService.paintProducts(
        products
    )
}

function renderCart() {
    cartContainer.innerHTML = htmlService.paintCart(
        cartService.getInfo()
    )
}

// async - ассихнонно
async function startApplication() {
    renderCart()

    try { // Асихронную часть кода занесём в try
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()

        productService = new ProductService(data)

        renderProducts(productService.products)

        messageService.sendOnSuccess("Товары загружены с сервера")
    } catch (e) { // В случае ошибки
        productsContainer.innerHTML = htmlService.paintError(e)

        messageService.sendOnError(e, "Не удалось загрузить товары с сервера")

        messageService.sendOnWarning("Загрузка товаров оффлайн", false, 5000)

        setTimeout(function () {
            try {
                productService = new ProductService(data)

                renderProducts(productService.products)

                messageService.sendOnSuccess("Товары успешно загружены")
            } catch (e) {
                messageService.sendOnError(e, "Не удалось загрузить товары оффлайн")
            }
        }, 3000)

    }
}

startApplication()