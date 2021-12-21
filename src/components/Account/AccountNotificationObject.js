import style from "../../styles/app.module.scss"

const AccountNotificationObject = ({ notification }) => {
	const date = new Date(notification.created_at)
	return (
		<div className={style.accountListObject}>
			<h2 className={style.accountListDate}>
				{date.getDate()}&nbsp;
				{date.toLocaleString("en-US", { month: "short" })}
				<br />
				{`${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${
					(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
				}`}
			</h2>
			<div className={style.accountListInfo}>
				<h2 className={style.accountListTitle} style={{ fontSize: 21 }}>
					{notification.content}
				</h2>
			</div>
		</div>
	)
}

export default AccountNotificationObject
