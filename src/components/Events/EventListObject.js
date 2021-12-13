import Image from "next/image"
import Link from "next/link"

import { Pin, Format, Theme, People, Comment } from "../../lib/icons/Misc"
import style from "../../styles/app.module.scss"

const EventListObject = () => {
	return (
		<div className={style.eventListObject}>
			<div className={style.eventListMain}>
				<div className={style.eventListCreator} title='Organizer'>
					<Link href='/user/Kupariss'>
						<a className={style.eventListCreatorImage}>
							<Image
								src={
									"https://cdn.discordapp.com/attachments/701503404513427466/918933315115950180/unknown.png"
								}
								alt='creatorImage'
								width={64}
								height={64}
								className={style.eventListCreatorImage}
								quality={100}
								objectFit='cover'
							/>
						</a>
					</Link>
					<h3 className={style.eventListCreatorName}>Kupariss</h3>
				</div>
				<span className={style.eventListPrice} title='Price'>
					$49.00
				</span>
			</div>
			<div className={style.eventListInfo}>
				<Link href='/user/1/events/1'>
					<a className={style.eventListTitle}>Hard rock concert</a>
				</Link>
				<span className={style.eventListDecsription}>
					Best rock concert ashsahjfbshbfhsdbfhjsdbhjsdbhfjsdbfhjb
					sdhfbsdhfbjshdbfjhsdbfhjsdbfhjsdbfsdjhfbhjdsfbjdhsf
					bsdjhfbhsdjbfhjsdbfjhsdbfjhsdbfjhsdbfjhsdbfhjsdbf
					sdbfhsbdhjf dsbfjhbsdhjfbsdhjfbsdhsbdhsvbjhdsbvhdbsjhvbsh
					jbhdsbhfdbshfbdshjb hjsdbfhjsdbf hjsdbjhf bsdjhfb jshdbf
					jhbjhsbhfdsbjhfsdbhjfbsdjhfb jhbsdhjfbhjsdbfhj
					hbdsjhfbsdhjfbjhsdbfhj shjhjfbhjsd sdbfhjsdbfhjdsbfjhdsbjhf
					sdbfhjdsfbjsdhfbhjd
				</span>
				<span className={style.eventListAddress} title='Event address'>
					<Pin /> VDNG, Kyiv, Ukraine
				</span>
				<div className={style.eventListSub}>
					<span
						className={style.eventListSubObject}
						title='Event theme'
					>
						<Theme />
						Music
					</span>
					<span
						className={style.eventListSubObject}
						title='Event format'
					>
						<Format />
						Concert
					</span>
					<span
						className={style.eventListSubObject}
						title='Also coming'
					>
						<People />
						69
					</span>
					<span className={style.eventListSubObject} title='Comments'>
						<Comment />
						420
					</span>
				</div>
			</div>
		</div>
	)
}

export default EventListObject
