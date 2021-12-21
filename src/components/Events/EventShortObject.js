import Image from "next/image"
import Link from "next/link"

import { Pin, Format, Theme } from "../../lib/icons/Misc"
import style from "../../styles/app.module.scss"

const EventShortObject = ({ organizer, event }) => {
	if (event.description)
		event.description =
			event.description.length >= 400
				? event.description.substr(0, 400) + ".."
				: event.description
	return (
		<div className={style.eventListObject}>
			<div className={style.eventListMain}>
				<div className={style.eventListCreator} title='Organizer'>
					<Link href={`/user/${organizer.name}`}>
						<a className={style.eventListCreatorImage}>
							<Image
								src={organizer.image}
								alt='creatorImage'
								width={64}
								height={64}
								className={style.eventListCreatorImage}
								quality={100}
								objectFit='cover'
							/>
						</a>
					</Link>
					<h3 className={style.eventListCreatorName}>
						{organizer.name}
					</h3>
				</div>
				<span className={style.eventListPrice} title='Price'>
					$ {event.price}
				</span>
			</div>
			<div className={style.eventListInfo}>
				<Link href={`/user/${organizer.name}/events/${event.id}`}>
					<a className={style.eventListTitle}>{event.title}</a>
				</Link>
				<span className={style.eventListDecsription}>
					{event.description}
				</span>
				<span className={style.eventListAddress} title='Event address'>
					<Pin /> {event.address}
				</span>
				<div className={style.eventListSub}>
					<span
						className={style.eventListSubObject}
						title='Event theme'
					>
						<Theme />
						{event.theme}
					</span>
					<span
						className={style.eventListSubObject}
						title='Event format'
					>
						<Format />
						{event.format}
					</span>
				</div>
			</div>
		</div>
	)
}

export default EventShortObject
