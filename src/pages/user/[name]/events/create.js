import nookies from "nookies"

import Application from "../../../../components"
import style from "../../../../styles/app.module.scss"

const Create = ({ user }) => {
	return (
		<Application user={user} title={user.name}>
			<div className={style.userPage}></div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	const user = cookie ? JSON.parse(cookie) : null

	if (!!!cookie || user.name !== ctx.params.name)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	return {
		props: { user: cookie ? JSON.parse(cookie) : null },
	}
}

export default Create
