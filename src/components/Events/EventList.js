import { useState } from "react"

import style from "../../styles/app.module.scss"
import EventListObject from "./EventListObject"

const EventList = ({ events }) => {
	const [theme, setTheme] = useState()
	const [format, setFormat] = useState()

	const handleChange = (target) => {
		switch (target.name) {
			case "theme":
				setTheme(target.value)
				break
			case "format":
				setFormat(target.value)
				break
		}
	}

	return (
		<div className={style.listBlock}>
			<div className={style.eventList}>
				<h2 className={style.eventListHeading}>Availaible events</h2>
				<div className={style.filtersBlock}>
					<label className={style.filtersHeading}>Format:</label>
					<select
						value={format}
						name='format'
						className={style.filtersSelect}
						onChange={(e) => handleChange(e.target)}
					>
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
						<option>Business</option>
						<option>Politics</option>
						<option>Psychology</option>
						<option>Education</option>
						<option>Entertainment</option>
						<option>Music</option>
						<option>Art</option>
					</select>
				</div>
				{events.map((event) => {
					return <EventListObject key={event.id} event={event} />
				})}
			</div>
		</div>
	)
}

export default EventList
