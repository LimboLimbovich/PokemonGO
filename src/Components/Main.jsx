import React from 'react'
import Card from './Card'

import axios from 'axios'
import { useEffect, useState } from 'react'
const Main = () => {
	const [pokeData, setPokeData] = useState([])
	const [loading, setLoading] = useState(true)
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')

	const pokeFun = async () => {
		setLoading(true)
		const res = await axios.get(url)
		getPokemon(res.data.results)
		setLoading(false)
	}
	const getPokemon = async res => {
		res.map(async item => {
			const result = await axios.get(item.url)
			setPokeData(state => {
				state = [...state, result.data]
				state.sort((a, b) => (a.id > b.id ? 1 : -1))
				return state
			})
		})
	}
	useEffect(() => {
		pokeFun()
	}, [url])
	return (
		<>
			<div className='container'>
				<div className='left-content'>
					<Card pokemon={pokeData} loading={loading} />
				</div>
			</div>
		</>
	)
}
export default Main
