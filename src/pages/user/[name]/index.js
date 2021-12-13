import nookies from "nookies"
import toast from "react-hot-toast"
import axios from "axios"

import style from "../../../styles/app.module.scss"
import UserBanner from "../../../components/User/UserBanner"
import UserEvents from "../../../components/User/UserEvents"
import Application from "../../../components"

const user = ({ user, owner, isOwner }) => {
	return (
		<Application user={user} title={owner.name}>
			<div className={style.userPage}>
				<UserBanner owner={owner} isOwner={isOwner} />
				<UserEvents />
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	const user = cookie ? JSON.parse(cookie) : null

	// const response = await axios
	// 	.get(`${process.env.API_URL}/users/${ctx.params.name}`, {
	// 		headers: {
	// 			Accept: "application/json",
	// 		},
	// 	})
	// 	.catch(() => {
	// 		return false
	// 	})

	// if (!response)
	// 	return {
	// 		redirect: {
	// 			permanent: false,
	// 			destination: `/user/${user.name}`,
	// 		},
	// 	}

	const owner = {
		name: ctx.params.name,
		events: {},
		image: "https://cdn.discordapp.com/attachments/701503404513427466/918933315115950180/unknown.png",
	}

	return {
		props: {
			user: user,
			owner: owner,
			isOwner: user ? user.name === owner.name : false,
		},
	}
}

export default user
