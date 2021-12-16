import { useState } from "react"
import nookies from "nookies"
import Image from "next/image"
import toast from "react-hot-toast"
import axios from "axios"

import Application from "../../../../../components"
import style from "../../../../../styles/app.module.scss"

import Map from "../../../../../components/Location/Map"

const Edit = ({ user, event }) => {
	const [title, setTitle] = useState(event.title)
	const [description, setDesctiption] = useState(event.description)
	const [poster, setPoster] = useState(event.poster)
	const [format, setFormat] = useState(event.format)
	const [theme, setTheme] = useState(event.theme)
	const [date, setDate] = useState()
	const [time, setTime] = useState()
	const [price, setPrice] = useState(event.price)
	const [location, setLocation] = useState(event.location)
	const [address, setAddress] = useState(event.address)
	const [page, setPage] = useState(event.page)

	const handleSubmit = (e) => {
		axios
			.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location[0]},${location[1]}&key=${process.env.GOOGLE_API_KEY}`
			)
			.then((res) => setAddress(res.data.results[0].formatted_address))

		console.log({
			title,
			description,
			poster,
			format,
			theme,
			date,
			time,
			price,
			location,
			address,
			page,
		})

		const dt = new Date(`${date} ${time}:00`)
		const offset = dt.getTimezoneOffset() * 60 * 1000
		const utcTime = new Date(dt.setTime(dt.getTime() + offset))
		// const api = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Accept: "application/json",
		// 	},
		// 	data: {
		// 		title,
		// 		description,
		// 		poster,
		// 		format,
		// 		theme,
		// 		price,
		// 		page,
		// 		location,
		//		address,
		// 		date: `${utcTime.getFullYear()}-${
		// 			utcTime.getMonth() + 1
		// 		}-${utcTime.getDate()} ${
		// 			(utcTime.getHours() < 10 ? "0" : "") + utcTime.getHours()
		// 		}:${
		// 			(utcTime.getMinutes() < 10 ? "0" : "") +
		// 			utcTime.getMinutes()
		// 		}:00`,
		// 	},
		// 	url: `${process.env.API_URL}/`,
		// }

		// toast.promise(
		// 	axios.post(api.url, api.data, {
		// 		headers: api.headers,
		// 	}),
		// 	{
		// 		loading: "Creating your event...",
		// 		success: (response) => response.data.message,
		// 		error: (error) => error.response.data.message,
		// 	}
		// )
	}

	const handleChange = (e) => {
		switch (e.name) {
			case "title":
				setTitle(e.value)
				break
			case "description":
				setDesctiption(e.value)
				break
			case "format":
				setFormat(e.value)
				break
			case "theme":
				setTheme(e.value)
				break
			case "price":
				setPrice(e.value)
				break
			case "page":
				setPage(e.value)
				break
			case "date":
				setDate(e.value)
				break
			case "time":
				setTime(e.value)
				break
			case "poster":
				const formData = new FormData()
				formData.append(
					"image",
					document.querySelector("#poster").files[0]
				)

				const api = {
					headers: {
						"Content-Type": "multipart/form-data",
						Accept: "application/json",
						Authorization: user.token,
					},
					data: formData,
					url: `${process.env.API_URL}/users/me/avatar`,
				}

				toast.promise(
					axios.post(api.url, api.data, {
						headers: api.headers,
					}),
					{
						loading: "Uploading poster...",
						success: (response) => {
							setPoster(response.data.posterUrl)
							return response.data.message
						},
						error: (error) => error,
					}
				)
				break
		}
	}

	return (
		<Application user={user} title='Edit your event'>
			<div className={style.createPage}>
				<h1 className={style.createHead}>
					Let&apos;s create your own event!
				</h1>
				<form
					onSubmit={(e) => handleSubmit(e.preventDefault())}
					className={style.createBody}
				>
					<label className={style.eventCreateLabel}>
						Title
						<input
							type='text'
							className={style.eventCreateInput}
							name='title'
							value={title}
							onChange={(e) => handleChange(e.target)}
							required
							placeholder='Best party ever...'
						/>
					</label>
					<label className={style.eventCreateLabel}>
						Description
						<textarea
							className={style.eventCreateTextarea}
							name='description'
							value={description}
							onChange={(e) => handleChange(e.target)}
							required
							placeholder="Hello everyone, we're creating the best party ever..."
						></textarea>
					</label>
					<label className={style.eventCreateLabel}>
						Format
						<select
							value={format}
							name='format'
							className={style.eventCreateSelect}
							onChange={(e) => handleChange(e.target)}
						>
							<option>Arrangement</option>
							<option>Reminder</option>
							<option>Task</option>
						</select>
					</label>
					<label className={style.eventCreateLabel}>
						Theme
						<select
							value={theme}
							name='theme'
							className={style.eventCreateSelect}
							onChange={(e) => handleChange(e.target)}
						>
							<option>Arrangement</option>
							<option>Reminder</option>
							<option>Task</option>
						</select>
					</label>
					<label className={style.eventCreateLabel}>
						Price
						<input
							type='number'
							className={style.eventCreateInput}
							name='price'
							value={price}
							onChange={(e) => handleChange(e.target)}
							placeholder='$20.00'
							min='0'
							max='99.99'
							required
						/>
					</label>
					<label className={style.eventCreateLabel}>
						Page
						<input
							type='url'
							className={style.eventCreateInput}
							name='page'
							value={page}
							onChange={(e) => handleChange(e.target)}
							required
							placeholder='https://t.me/mygroup'
							pattern='https://.*'
							maxLength='64'
						/>
					</label>
					<label className={style.eventCreateLabel}>
						Location
						<Map setLocation={setLocation} />
					</label>
					<div className={style.eventCreateDateTimeBox}>
						<input
							type='date'
							className={style.eventCreateDate}
							value={date}
							min={`2021-12-01`}
							max='9999-12-31'
							name='date'
							onChange={(e) => handleChange(e.target)}
						/>
						<input
							type='time'
							className={style.eventCreateTime}
							value={time}
							name='time'
							onChange={(e) => handleChange(e.target)}
						/>
					</div>
					<label className={style.eventCreateLabel}>
						Poster
						<div className={style.eventCreatePoster}>
							<label htmlFor='image'>Upload a poster</label>
							<input
								id='poster'
								name='poster'
								onChange={(e) => handleChange(e.target)}
								type='file'
								accept='image/png, image/jpg, image/jpeg'
							/>
							{poster ? (
								<Image
									src={user.image}
									alt='posterPreview'
									width={300}
									height={400}
									layout='fixed'
									quality={100}
									objectFit='cover'
								/>
							) : null}
						</div>
					</label>
					<input
						className={style.eventCreateSubmit}
						type='submit'
						value='Create event'
					/>
				</form>
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	const user = cookie ? JSON.parse(cookie) : null

	// if (!!!cookie || user.name !== ctx.params.name)
	// 	return {
	// 		redirect: {
	// 			permanent: false,
	// 			destination: "/signin",
	// 		},
	// 	}

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
		page: "https://t.me/paxanddos",
	}

	return {
		props: { user: cookie ? JSON.parse(cookie) : null, event },
	}
}

export default Edit
