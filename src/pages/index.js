import nookies from "nookies"

import Application from "../components"
import CreateEvent from "../components/Events/CreateEvent"
import EventList from "../components/Events/EventList"
import AdsBanner from "../components/Base/AdsBanner"
import style from "../styles/app.module.scss"

const index = ({ user, events }) => {
	return (
		<Application user={user} title='Events'>
			<div className={style.interactiveBlock}>
				<CreateEvent user={user} />
				<AdsBanner />
			</div>
			<EventList events={events} />
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	const events = [
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
	]

	return { props: { user: cookie ? JSON.parse(cookie) : null, events } }
}

export default index
