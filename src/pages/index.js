import nookies from "nookies"

import Application from "../components/Layout"

const index = ({ user }) => {
	return (
		<Application user={user} title='Munity'>
			<div></div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	// const cookie = nookies.get(ctx).user
	// if (!!!cookie)
	// 	return {
	// 		redirect: {
	// 			permanent: false,
	// 			destination: "/signin",
	// 		},
	// 	}

	const user = {
		name: "PAXANDDOS",
		email: "pashalitovka@gmail.com",
		image: "",
	}
	return { props: { user: user } }
}

export default index
