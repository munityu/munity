import axios from "axios"
import nookies from "nookies"

import Application from "../components"
import EventList from "../components/Events/EventList"
import CreateEvent from "../components/Events/CreateEvent"
import AdsBanner from "../components/Base/AdsBanner"
import style from "../styles/app.module.scss"
import Pagination from "../components/Base/Pagination"

const index = ({ user, wrapper }) => {
	return (
		<Application user={user} title='Events'>
			<div className={style.interactiveBlock}>
				<CreateEvent user={user} />
				<AdsBanner />
			</div>
			<EventList events={wrapper.data} />
			<Pagination wrapper={wrapper} />
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	let queryString = ctx.query.page ? "?" : "?page=1"
	for (const param in ctx.query)
		queryString += `&${param}=${ctx.query[param]}`

	const response = await axios.get(
		`${process.env.API_URL}/events${queryString}`
	)

	return {
		props: {
			user: cookie ? JSON.parse(cookie) : null,
			wrapper: response.data,
		},
	}
}

export default index
