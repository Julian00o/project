const cartContainer = document.querySelector('#cartProducts')

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || []

  cartContainer.innerHTML = ''

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <p class='text-[45px] text-red-500 mt-[100px] text-center'>Корзина пуста</p>
    `
    return
  }

  cart.forEach(item => {
    const itemDiv = document.createElement('div')
    itemDiv.className = 'mt-[30px] flex items-center justify-between w-[700px] m-auto'

    itemDiv.innerHTML = `
      <div class='flex items-center gap-[20px]'>
        <img class='w-[100px]' src="${item.image}" alt="">
        <h1 class='text-[22px] font-medium'>${item.title}</h1>
      </div>
      <div class='flex items-center gap-[20px]'>
        <p class='text-[22px] font-medium'>$${item.price}</p>
        <button class='text-[32px] hover:text-red-500 font-medium'>x</button>
      </div>
    `

    const btn = itemDiv.querySelector('button')
    btn.addEventListener('click', () => removeFromCart(item.id))

    cartContainer.appendChild(itemDiv)
  })
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  cart = cart.filter(item => item.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart))
  loadCart()
}

loadCart()