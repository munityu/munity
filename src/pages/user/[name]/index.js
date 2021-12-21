import axios from "axios"
import nookies from "nookies"

import Application from "../../../components"
import style from "../../../styles/app.module.scss"
import UserBanner from "../../../components/User/UserBanner"
import EventShortObject from "../../../components/Events/EventShortObject"

const user = ({ user, owner, isOwner }) => {
	return (
		<Application user={user} title={owner.name}>
			<div className={style.userPage}>
				<UserBanner owner={owner} isOwner={isOwner} />
				<div className={style.userEvents}>
					{owner.organizer.map((event) => {
						return (
							<EventShortObject
								key={event.id}
								organizer={owner}
								event={event}
							/>
						)
					})}
				</div>
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	const user = cookie ? JSON.parse(cookie) : null

	const response = await axios.get(
		`${process.env.API_URL}/users/${ctx.params.name}`
	)

	return {
		props: {
			user: user,
			owner: response.data,
			isOwner: user ? user.name === response.data.name : false,
		},
	}
}

export default user
