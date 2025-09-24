const productDetail = document.querySelector('#productDetail')


const params = new URLSearchParams(window.location.search)
const productId = params.get('id')


async function fetchProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
    const product = await res.json()
    renderProduct(product)
  } catch (error) {
    console.error('Не удалось загрузить продукт', error)
    productDetail.innerHTML = `
      <h1 class='text-[55px] text-red-500 mt-[100px]'>
        Не удалось загрузить продукт
      </h1>
    `
  }
}

function renderProduct(product) {
  productDetail.innerHTML = `
    <div class='flex items-center justify-between mt-[100px] h-[500px] rounded-[24px] bg-[black] p-[20px]'>
      <img src="${product.image}" alt="${product.title}" class='w-[300px]'>
      <div class='ml-[100px]'>
        <h1 class='text-[white] text-[30px] mt-[10px] font-medium ml-[300px]'>
          Shop.OP
        </h1>
        <h1 class='text-[white] text-[40px] mt-[10px] font-medium'>
          ${product.title}
        </h1>
        <p class='text-[white] text-[30px] mt-[10px] font-medium'>
          $${product.price}
        </p>
        <p class='text-[white] text-[20px] mt-[10px] font-medium'>
          ${product.description}
        </p>
        <p class='text-[white] text-[10px] mt-[10px] font-medium'>
          ${product.category}
        </p>
        <button 
          id='addToCartBtn' 
          class='text-[black] bg-[white] w-[170px] font-medium h-[50px] ml-[270px] rounded-[12px] mt-[10px]'>
          Добавить в корзину
        </button>
      </div>
    </div>
  `

  const addToCartBtn = document.querySelector('#addToCartBtn')
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => addToCart(product))
  } else {
    console.error('Кнопка "Добавить в корзину" не найдена!')
  }
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]')

  const existingProduct = cart.find(item => item.id === product.id)

  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  alert('Товар добавлен в корзину')
}

if (productId) {
  fetchProduct(productId)
} else {
  productDetail.innerHTML = `
    <h1 class='text-[40px] text-red-500 mt-[100px]'>
    Товар не найден
    </h1>
  `
}