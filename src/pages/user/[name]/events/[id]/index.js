import nookies from "nookies"
import Image from "next/image"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"

import PointedMap from "../../../../../components/Location/PointedMap"
import Application from "../../../../../components"
import style from "../../../../../styles/app.module.scss"
import { Format, People, Theme } from "../../../../../lib/icons/Misc"
import CommentObject from "../../../../../components/Comments/CommentObject"
import CreateComment from "../../../../../components/Comments/CreateComment"
import Link from "next/link"

const EventParticipant = ({ participant }) => {
	return (
		<div className={style.eventParticipant} title={participant.name}>
			<Image
				src={participant.image}
				alt='participantPicture'
				width={50}
				height={50}
				layout='fixed'
				quality={50}
				objectFit='cover'
			/>
		</div>
	)
}

const Event = ({ user, event }) => {
	console.log(event)
	dayjs.extend(calendar)

	const deleteEvent = () => {
		console.log("yrs")
	}

	return (
		<Application user={user} title={"Event"}>
			<div className={style.eventPage}>
				<div className={style.eventPosterBlock}>
					<div className={style.eventPoster}>
						<Image
							src={event.poster}
							alt='posterPreview'
							width={300}
							height={400}
							layout='fixed'
							quality={100}
							objectFit='cover'
						/>
					</div>
					<div className={style.eventCreatorBlock}>
						<Image
							src={event.organizer.image}
							alt='avatarPreview'
							width={60}
							height={60}
							layout='fixed'
							quality={20}
							objectFit='cover'
						/>
						<span>
							{event.organizer.name} <small>organizer</small>
						</span>
					</div>
					<span className={style.eventPrice}>$ {event.price}</span>
					<Link
						href={`/user/${event.organizer.name}/events/${event.id}/order`}
					>
						<a className={style.eventBuyBtn}>Buy a ticket</a>
					</Link>
					{user.name === event.organizer.name && (
						<>
							<Link
								href={`/user/${user.name}/events/${event.id}/edit`}
							>
								<a
									style={{
										marginTop: "6px",
										width: "fit-content",
									}}
								>
									Edit event
								</a>
							</Link>
							<a
								style={{
									marginTop: "6px",
									color: "red",
									cursor: "pointer",
									width: "fit-content",
								}}
								onClick={deleteEvent}
							>
								Delete event
							</a>
						</>
					)}
				</div>
				<div className={style.eventInfoBlock}>
					<h1 className={style.eventTitle}>{event.title}</h1>
					<div className={style.eventPageSub}>
						<span className={style.eventSub} title='Event theme'>
							<Theme />
							{event.theme}
						</span>
						<span className={style.eventSub} title='Event format'>
							<Format />
							{event.format}
						</span>
						<span className={style.eventSub} title='Also Coming'>
							<People />
							{event.users.length}
						</span>
					</div>
					<span className={style.eventDate}>
						{dayjs().calendar(event.date)}
					</span>
					<div className={style.eventLocation}>
						<span>{event.address}</span>
						<PointedMap location={event.location} />
					</div>
					<span className={style.eventDescription}>
						{event.description}
					</span>
					{event.users.length !== 0 ? (
						<div className={style.eventParticipants}>
							<h2>Also coming</h2>
							<div className={style.eventParticipantList}>
								{event.users.map((participant) => {
									return (
										<EventParticipant
											key={participant.id}
											participant={participant}
										/>
									)
								})}
							</div>
						</div>
					) : null}
					<div className={style.eventComments}>
						<h2>Comments</h2>
						<CreateComment user={user} event_id={event.id} />
						{event.comments.map((comment) => {
							return (
								<CommentObject
									key={comment.id}
									comment={comment}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	const event = {
		id: 1,
		title: "The best party ever!",
		description:
			"Blah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blah Blah blah blahBlah blah blah Blah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blahBlah blah blah",
		poster: "https://d3djy7pad2souj.cloudfront.net/munity/posters/akino.jpg",
		format: "Party",
		theme: "Entertainment",
		price: 10.0,
		location: [50.01303427698978, 36.22673034667969],
		address: "Niggstreet 29, 35, Furland",
		date: "12-15-2021 16:00:00",
		nv_notifications: false,
		public_visitors: false,
		promocode: null,
		users: [
			{
				id: 1,
				name: "Nword",
				image: "https://cdn.discordapp.com/attachments/641997907154698250/921027016516575252/come-again-nigga-are-you-feeling-it-now-mr-krabs-55766070.jpg",
			},
			{
				id: 2,
				name: "Furry",
				image: "https://cdn.discordapp.com/attachments/641997907154698250/921027016516575252/come-again-nigga-are-you-feeling-it-now-mr-krabs-55766070.jpg",
			},
		],
		organizer: {
			name: "Kupariss",
			image: "https://cdn.discordapp.com/attachments/701503404513427466/918933315115950180/unknown.png",
		},
		comments: [
			{
				id: 1,
				user: {
					name: "Cringe",
					image: "https://cdn.discordapp.com/attachments/701503404513427466/918933315115950180/unknown.png",
				},
				content: "I'm already cumming!",
			},
			{
				id: 2,
				user: {
					name: "Dumbass",
					image: "https://cdn.discordapp.com/attachments/701503404513427466/918933315115950180/unknown.png",
				},
				content: "What?!",
			},
		],
		page: "https://t.me/paxanddos",
	}

	return {
		props: { user: cookie ? JSON.parse(cookie) : null, event },
	}
}

export default Event
