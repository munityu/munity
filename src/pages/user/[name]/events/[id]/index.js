import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import nookies from "nookies"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"

import PointedMap from "../../../../../components/Location/PointedMap"
import Application from "../../../../../components"
import style from "../../../../../styles/app.module.scss"
import { Format, People, Theme } from "../../../../../lib/icons/Misc"
import CommentObject from "../../../../../components/Comments/CommentObject"
import CreateComment from "../../../../../components/Comments/CreateComment"

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
	dayjs.extend(calendar)
	const router = useRouter()
	const [comments, setComments] = useState(event.comments)
	const [isMember, setIsMember] = useState(false)

	useEffect(() => {
		for (const member of event.members)
			if (member.id === user?.id) setIsMember(true)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const deleteEvent = () => {
		axios
			.delete(`${process.env.API_URL}/events/${event.id}`, {
				headers: { Authorization: user.token },
			})
			.then(() => router.replace("/"))
	}

	return (
		<Application user={user} title={"Event"}>
			<div className={style.eventPage}>
				<div className={style.eventPosterBlock}>
					<div className={style.eventPoster}>
						{event.poster && (
							<Image
								src={event.poster}
								alt='posterPreview'
								width={300}
								height={400}
								layout='fixed'
								quality={100}
								objectFit='cover'
							/>
						)}
					</div>
					<div className={style.eventCreatorBlock}>
						<Image
							src={event.organizer[0].image}
							alt='avatarPreview'
							width={60}
							height={60}
							layout='fixed'
							quality={20}
							objectFit='cover'
						/>
						<span>
							{event.organizer[0].name} <small>organizer</small>
						</span>
					</div>
					<span className={style.eventPrice}>$ {event.price}</span>
					{isMember ? (
						<a className={style.eventBuyBtn}>
							You&apos;re a member
						</a>
					) : (
						<Link
							href={`/user/${event.organizer[0].name}/events/${event.id}/order`}
						>
							<a className={style.eventBuyBtn}>Buy a ticket</a>
						</Link>
					)}
					{user && user.name === event.organizer[0].name && (
						<div className={style.controlBtnBlock}>
							<Link
								href={`/user/${user.name}/events/${event.id}/edit`}
							>
								<a className={style.controlBtn}>Edit event</a>
							</Link>
							<a
								className={style.controlBtn}
								onClick={deleteEvent}
								name='delete'
							>
								Delete event
							</a>
						</div>
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
							{event.members.length}
						</span>
					</div>
					<span className={style.eventDate}>
						{dayjs(event.date).calendar()}
					</span>
					<div className={style.eventLocation}>
						<span>{event.address}</span>
						<PointedMap location={event.location.coordinates} />
					</div>
					<span className={style.eventDescription}>
						{event.description}
					</span>
					{event.public_visitors && event.members.length !== 0 ? (
						<div className={style.eventParticipants}>
							<h2>Also coming</h2>
							<div className={style.eventParticipantList}>
								{event.members.map((participant) => {
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
						{user && (
							<CreateComment
								user={user}
								event_id={event.id}
								setComments={setComments}
							/>
						)}
						{comments.map((comment) => {
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

	const response = await axios.get(
		`${process.env.API_URL}/events/${ctx.params.id}`
	)

	return {
		props: {
			user: cookie ? JSON.parse(cookie) : null,
			event: response.data,
		},
	}
}

export default Event
