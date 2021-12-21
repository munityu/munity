import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import style from "../../styles/app.module.scss"

const EventFilters = () => {
	const router = useRouter()
	const [format, setFormat] = useState("Any")
	const [theme, setTheme] = useState("Any")

	useEffect(() => {
		for (const param in router.query)
			switch (param.toLowerCase()) {
				case "format":
					setFormat(router.query[param])
					break
				case "theme":
					setTheme(router.query[param])
					break
			}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const handleChange = (target) => {
		let queryString = router.query.page ? "?" : "?page=1"
		switch (target.name) {
			case "format":
				setFormat(target.value)
				target.value === "Any"
					? delete router.query.format
					: (router.query.format = target.value)
				break
			case "theme":
				setTheme(target.value)
				target.value === "Any"
					? delete router.query.theme
					: (router.query.theme = target.value)
				break
		}
		for (const param in router.query)
			queryString += `&${param}=${router.query[param]}`
		router.push(router.basePath + queryString)
	}

	return (
		<div className={style.filtersBlock}>
			<label className={style.filtersHeading}>Format:</label>
			<select
				value={format}
				name='format'
				className={style.filtersSelect}
				onChange={(e) => handleChange(e.target)}
			>
				<option>Any</option>
				<option>Conference</option>
				<option>Seminar</option>
				<option>Workshop</option>
				<option>Class</option>
				<option>Party</option>
				<option>Fest</option>
				<option>Con</option>
				<option>Show/Expo</option>
			</select>
			<label className={style.filtersHeading}>Theme:</label>
			<select
				value={theme}
				name='theme'
				className={style.filtersSelect}
				onChange={(e) => handleChange(e.target)}
			>
				<option>Any</option>
				<option>Business</option>
				<option>Politics</option>
				<option>Psychology</option>
				<option>Education</option>
				<option>Entertainment</option>
				<option>Music</option>
				<option>Art</option>
			</select>
		</div>
	)
}

export default EventFilters
