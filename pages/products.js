const productsConteiner = document.querySelector('#products')
const searchInput = document.querySelector('#searchInput')

let data = []

async function fetchProducts() {
	try {
		const res = await fetch('https://fakestoreapi.com/products')
		console.log(res)

		data = await res.json()
		renderProducts(data)
	} catch (error) {
		console.error('Не удалось загрузить продукты', error)

		productsConteiner.innerHTML = `<h1 class='text-[55px] text-red-500 mt-[100px]'>Не удалось загрузить продукты</h1>`
	}

	function renderProducts(products) {
		productsConteiner.innerHTML = ''

		if (products.length === 0) {
			productsConteiner.innerHTML =
				"<h1 class='text-[55px] text-red-500 mt-[100px]'>Не удалось найти товары</h1>"
			return
		}

		products.forEach(prod => {
			const div = document.createElement('div')

			div.className = 'w-[350px] mt-[20px] bg-[white] shadow-md'

			div.innerHTML = `

		<a href="./detail.html?id=${prod.id}">
		
		<img
			 src=${prod.image} class='w-full h-[478px] object-cover' alt=""/>
			<h1 class='text-center text-[23px] font-medium mt-[20px]'>${prod.title}</h1>
			<p class='text-center text-[gray] font-medium mt-[20px]'>${prod.price}</p>
		
		</a>

		`

			productsConteiner.appendChild(div)
		})
	}
}

searchInput.addEventListener('input', e => {
	const query = e.target.value.toLowerCase()
	const filtered = data.filter(prod => prod.title.toLowerCase().includes(query))
	renderProducts(filtered)
})

fetchProducts()
