import nookies from "nookies"
import toast from "react-hot-toast"
import axios from "axios"

import style from "../../../styles/app.module.scss"
import UserBanner from "../../../components/User/UserBanner"
import EventListObject from "../../../components/Events/EventListObject"
import Application from "../../../components"

const user = ({ user, owner, isOwner }) => {
	return (
		<Application user={user} title={owner.name}>
			<div className={style.userPage}>
				<UserBanner owner={owner} isOwner={isOwner} />
				<div className={style.userEvents}>
					{owner.events.map((event) => {
						return <EventListObject key={event.id} event={event} />
					})}
				</div>
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
		events: [
			{
				id: 1,
				title: "The best party ever!",
				description:
					"Blah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah",
				format: "Party",
				theme: "Entertainment",
				price: 10.0,
				address: "Niggstreet 29, 35, Furland",
				date: "12-15-2021 16:00:00",
				users: [
					{
						name: "Nword",
						image: "https://cdn.discordapp.com/attachments/641997907154698250/921027016516575252/come-again-nigga-are-you-feeling-it-now-mr-krabs-55766070.jpg",
					},
					{
						name: "Furry",
						image: "https://cdn.discordapp.com/attachments/641997907154698250/921027016516575252/come-again-nigga-are-you-feeling-it-now-mr-krabs-55766070.jpg",
					},
				],
				comments: [
					{
						user: {
							name: "Cringe",
							image: "https://cdn.discordapp.com/attachments/701503404513427466/918933315115950180/unknown.png",
						},
						content: "I'm already cumming!",
					},
				],
				organizer: {
					name: "Kupariss",
					image: "https://cdn.discordapp.com/attachments/701503404513427466/918933315115950180/unknown.png",
				},
			},
		],
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
