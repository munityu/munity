import style from "../../styles/app.module.scss"
import EventFilters from "./EventFilters"
import EventListObject from "./EventListObject"

const EventList = ({ events }) => {
	return (
		<div className={style.listBlock}>
			<div className={style.eventList}>
				<h2 className={style.eventListHeading}>Availaible events</h2>
				<EventFilters />
				{events.map((event) => {
					return <EventListObject key={event.id} event={event} />
				})}
			</div>
		</div>
	)
}

export default EventList
