import nookies from "nookies"

import Application from "../components"
import CreateEvent from "../components/Events/CreateEvent"
import EventList from "../components/Events/EventList"
import AdsBanner from "../components/Base/AdsBanner"
import style from "../styles/app.module.scss"

const index = ({ user }) => {
	return (
		<Application user={user} title='Events'>
			<div className={style.interactiveBlock}>
				<CreateEvent user={user} />
				<AdsBanner />
			</div>
			<EventList />
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	return { props: { user: cookie ? JSON.parse(cookie) : null } }
}

export default index
