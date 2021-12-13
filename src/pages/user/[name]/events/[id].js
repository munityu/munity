import nookies from "nookies"

import Application from "../../../../components"
import style from "../../../../styles/app.module.scss"

const Event = ({ user }) => {
	return (
		<Application user={user} title={"Event"}>
			<div className={style.userPage}></div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	return {
		props: { user: cookie ? JSON.parse(cookie) : null },
	}
}

export default Event
