import { useState, useEffect } from 'react'

// Replace with your CFX server code (visible in FiveM server browser URL)
const CFX_SERVER_ID = 'REPLACE_WITH_YOUR_CFX_ID'

export default function useFivemPlayers() {
	const [data, setData] = useState({ players: null, max: null, loading: true })

	useEffect(() => {
		let cancelled = false

		async function poll() {
			try {
				const res = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${CFX_SERVER_ID}`, {
					cache: 'no-store',
				})
				const json = await res.json()
				if (!cancelled) {
					setData({
						players: json?.Data?.clients ?? null,
						max: json?.Data?.sv_maxclients ?? null,
						loading: false,
					})
				}
			} catch {
				if (!cancelled) setData({ players: null, max: null, loading: false })
			}
		}

		poll()
		const id = setInterval(poll, 60_000)
		return () => {
			cancelled = true
			clearInterval(id)
		}
	}, [])

	return data
}
