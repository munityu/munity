import Link from "next/link"
import style from "../../styles/app.module.scss"
import { Format, Theme, People, Comment } from "../../lib/icons/Misc"

const AccountListObject = ({ user, event }) => {
	event.date = new Date(event.date)
	return (
		<div className={style.accountListObject}>
			<h2 className={style.accountListDate}>
				{event.date.getDate()}&nbsp;
				{event.date.toLocaleString("en-US", { month: "short" })}
				<br />
				{`${
					(event.date.getHours() < 10 ? "0" : "") +
					event.date.getHours()
				}:${
					(event.date.getMinutes() < 10 ? "0" : "") +
					event.date.getMinutes()
				}`}
			</h2>
			<div className={style.accountListInfo}>
				<Link href={`/user/${user.name}/events/${event.id}`}>
					<a className={style.accountListTitle}>{event.title}</a>
				</Link>
				<div className={style.accountListSub}>
					<span
						className={style.accountListSubObject}
						title='Event theme'
					>
						<Theme />
						{event.theme}
					</span>
					<span
						className={style.accountListSubObject}
						title='Event format'
					>
						<Format />
						{event.format}
					</span>
					<span
						className={style.accountListSubObject}
						title='Also coming'
					>
						<People />
						{event.members?.length}
					</span>
					<span
						className={style.accountListSubObject}
						title='Comments'
					>
						<Comment />
						{event.comments?.length}
					</span>
				</div>
			</div>
		</div>
	)
}

export default AccountListObject
