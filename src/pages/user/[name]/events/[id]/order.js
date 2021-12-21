import axios from "axios"
import nookies from "nookies"
import { useState } from "react"
import toast from "react-hot-toast"

import Application from "../../../../../components"
import { Card } from "../../../../../lib/icons/Misc.jsx"
import style from "../../../../../styles/app.module.scss"

const Order = ({ user, event }) => {
	const [cardNumber, setCardNumber] = useState("")
	const [cardDate, setCardDate] = useState("")
	const [cardCVV, setCardCVV] = useState("")

	const handleOrder = () => {
		toast.promise(
			axios.post(
				`${process.env.API_URL}/events/${event.id}/subscribe`,
				null,
				{ headers: { Authorization: user.token } }
			),
			{
				loading: "Ordering...",
				success: () => {
					event.page
						? window.open(event.page, "_ blank")
						: location.reload()
				},
				error: "Bad",
			}
		)
	}

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
							Ticket to the {event.organizer[0].name}&apos;s event
						</span>
						<div>
							<span>#ID</span>
							<span>{event.id}</span>
						</div>
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
	if (!!!cookie)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}
	const user = JSON.parse(cookie)

	const response = await axios.get(
		`${process.env.API_URL}/events/${ctx.params.id}`
	)

	for (const member of response.data.members)
		if (member.id === user.id)
			return {
				redirect: {
					permanent: false,
					destination: `/user/${ctx.params.name}/events/${ctx.params.id}`,
				},
			}

	return {
		props: { user, event: response.data },
	}
}

export default Order
