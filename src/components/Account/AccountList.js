import style from "../../styles/app.module.scss"
import AccountListObject from "./AccountListObject"

const AccountList = ({ user, type, events }) => {
	let title
	switch (type) {
		case "events":
			title = "Your events"
			break
		case "tickets":
			title = "Your tickets"
			break
		case "notifications":
			title = "Your notifications"
			break
	}
	return (
		<div className={style.accountList}>
			<div className={style.accountListHead}>
				<h2>{title}</h2>
			</div>
			<div className={style.accountListBody}>
				{events.map((event) => {
					return (
						<AccountListObject
							key={event.id}
							user={user}
							event={event}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default AccountList
