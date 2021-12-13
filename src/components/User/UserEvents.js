import EventListObject from "../Events/EventListObject"
import styles from "../../styles/app.module.scss"

const UserEvents = () => {
	return (
		<div className={styles.userEvents}>
			<EventListObject />
			<EventListObject />
			<EventListObject />
			<EventListObject />
			<EventListObject />
		</div>
	)
}

export default UserEvents
