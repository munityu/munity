import nookies from "nookies"
import { useState } from "react"

import Application from "../../../../../components"
import { Card } from "../../../../../lib/icons/Misc.jsx"
import style from "../../../../../styles/app.module.scss"

const Order = ({ user, event }) => {
	const [cardNumber, setCardNumber] = useState("")
	const [cardDate, setCardDate] = useState("")
	const [cardCVV, setCardCVV] = useState("")

	const handleOrder = () => {}

	return (
		<Application user={user} title={"Buy a ticket"}>
			<form
				className={style.orderPage}
				onSubmit={(e) => handleOrder(e.preventDefault())}
			>
				<div className={style.amountInfoBlock}>
					<div className={style.amountInfoLine}>
						<span>Total to pay:</span>
						<div>
							<span>{event.price}</span>
							<span>&nbsp;USD</span>
						</div>
					</div>
					<div className={style.amountInfoLine}>
						<span>
							Ticket to the {event.organizer.name}&apos;s event
						</span>
					</div>
				</div>
				<div className={style.cardHead}>
					<Card />
					<span>Card</span>
				</div>
				<div className={style.cardForm}>
					<div className={style.cardInput}>
						<span>Card number</span>
						<input
							autoComplete='cc-number'
							placeholder='••••&nbsp;••••&nbsp;••••&nbsp;••••'
							type='tel'
							minLength='16'
							maxLength='16'
							value={cardNumber}
							onChange={(e) => setCardNumber(e.target.value)}
						/>
						<hr />
					</div>
					<div>
						<div className={style.cardInput}>
							<span>Card expiry date</span>
							<input
								placeholder='MM/YY'
								type='tel'
								minLength='7'
								maxLength='7'
								autoComplete='cc-exp'
								value={cardDate}
								onChange={(e) => setCardDate(e.target.value)}
							/>
							<hr />
						</div>
						<div
							className={style.cardInput}
							style={{ marginLeft: "18px" }}
						>
							<span>CVV2</span>
							<input
								placeholder='•••'
								minLength='3'
								maxLength='3'
								type='password'
								autoComplete='cc-csc'
								value={cardCVV}
								onChange={(e) => setCardCVV(e.target.value)}
							/>
							<hr />
						</div>
					</div>
				</div>
				<input type='submit' value='Pay' />
			</form>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	const event = {
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

export default Order
