let API = `https://pokeapi.co/api/v2/pokemon`

let currentPage = 1
let search = ''
let category = 'All'
let sort = 'None'
let limit = 10

let start = limit * currentPage
let end = start + limit

let pokemonData = []
let pokemonData2 = []
let paginatedData

// limitInp.addEventListener('input', (e) => {
// 	limit = e.target.value
// 	console.log(limit)
// })

function pagination() {}

async function getData() {
	let res = await fetch(`${API}?limit=1154`)
	let data = await res.json()
	data.results.map(async (item) => {
		let res2 = await fetch(item.url)
		let data2 = await res2.json()
		pokemonData.push(data2)
	})
}

getData()

function filter() {
	if (category === 'All') {
		pokemonData2 = pokemonData
	} else {
		pokemonData2 = pokemonData.filter(
			(item) => category === item.types[0].type.name
		)
	}
	let defaultPokemonData = pokemonData2
	if (sort === 'A-Z') {
		defaultPokemonData.sort(function (a, b) {
			if (a.name < b.name) {
				return -1
			}
			if (a.name > b.name) {
				return 1
			}
			return 0
		})
	} else if (sort === 'Z-A') {
		defaultPokemonData.sort(function (a, b) {
			if (a.name < b.name) {
				return 1
			}
			if (a.name > b.name) {
				return -1
			}
			return 0
		})
	} else {
		defaultPokemonData = pokemonData2
	}
	pokemonData2 = defaultPokemonData

	let limitInp = document.querySelector('#limit')
	limit = limitInp.value

	console.log(limit)

	paginatedData = pokemonData2.slice(start, end)
	console.log(paginatedData)
	render()
}
// setTimeout(() => {
// 	filter()
// }, 600)

function render() {
	let pokemonList = document.querySelector('.container__list')
	pokemonList.innerHTML = ''
	if (search !== '') {
		pokemonData2.forEach((data2) => {
			if (data2.name.search(search) == -1) {
				return
			} else {
				pokemonList.innerHTML += `<div class='container__item'><img class='container__item__img' src='${data2.sprites.front_default}'/><p class='container__item__text'>${data2.name}</p></div>`
			}
		})
	} else {
		setTimeout(() => {
			paginatedData.forEach((data) => {
				pokemonList.innerHTML += `<div class='container__item'><img class='container__item__img' src='${data.sprites.front_default}'/><p class='container__item__text'>${data.name}</p><p>${data.types[0].type.name}</p></div>`
			})
		}, 400)
	}
}
addCategoryToDropdownMenu()

let searchInp = document.querySelector('#filter-search__input')
let searchBtn = document.querySelector('#filter-search__btn')
searchInp.addEventListener('input', (e) => {
	if (!e.target.value.trim()) {
		search = e.target.value
		render()
	}
})
searchBtn.addEventListener('click', (e) => {
	// if (!e.target.value.trim()) {
	// 	return
	// }
	search = searchInp.value
	// limit = 20
	// category = 'All'
	render()
})

// category start

async function addCategoryToDropdownMenu() {
	let res = await fetch('https://pokeapi.co/api/v2/type')
	let data = await res.json()
	let categories = new Set(data.results.map((item) => item.name))

	let categoriesList = document.querySelector('.fa-options')
	categoriesList.innerHTML = '<li>All</li>'
	categories.forEach((item) => {
		categoriesList.innerHTML += `<li>${item}</li>`
	})
	chooseCategory()
}

function chooseCategory() {
	const selects = document.getElementsByClassName('fa-select')
	const options = document.querySelectorAll('.fa-options li')
	selects[0].addEventListener('click', function () {
		this.classList.toggle('active')
	})
	// console.log(selects)
	options.forEach((option) => {
		option.addEventListener('click', () => {
			const text = option.innerText
			const selectDOM = option.parentNode.previousSibling.previousSibling
			selectDOM.classList.remove('active')
			selectDOM.innerText = text
			category = text
		})
	})
	console.log(category)
}

function chooseSort() {
	const sortSelect = document.getElementsByClassName('sort-select')
	const sortOptions = document.querySelectorAll('.sort-options li')
	sortSelect[0].addEventListener('click', function () {
		this.classList.toggle('active')
	})
	sortOptions.forEach((option) => {
		option.addEventListener('click', () => {
			const text = option.innerText
			const selectDOM = option.parentNode.previousSibling.previousSibling
			selectDOM.classList.remove('active')
			selectDOM.innerText = text
			sort = text
		})
	})
}
chooseSort()

let filterBtn = document.querySelector('#filter-btn')
filterBtn.addEventListener('click', filter)
// filterBtn.addEventListener('DOMContentLoaded', filter)

// chooseCategory()
// category end
