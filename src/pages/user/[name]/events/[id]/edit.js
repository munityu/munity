import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import nookies from "nookies"
import toast from "react-hot-toast"

import Application from "../../../../../components"
import Map from "../../../../../components/Location/Map"
import style from "../../../../../styles/app.module.scss"

const Edit = ({ user, event }) => {
	const router = useRouter()
	event.date = new Date(event.date)
	const [title, setTitle] = useState(event.title)
	const [description, setDesctiption] = useState(event.description)
	const [poster, setPoster] = useState()
	const [posterSrc, setPosterSrc] = useState(event.poster)
	const [format, setFormat] = useState(event.format)
	const [theme, setTheme] = useState(event.theme)
	const [date, setDate] = useState(
		`${event.date.getFullYear()}-${
			event.date.getMonth() + 1
		}-${event.date.getDate()}`
	)
	const [time, setTime] = useState(
		`${(event.date.getHours() < 10 ? "0" : "") + event.date.getHours()}:${
			(event.date.getMinutes() < 10 ? "0" : "") + event.date.getMinutes()
		}`
	)
	const [price, setPrice] = useState(event.price)
	const [location, setLocation] = useState(event.location.coordinates)
	const [page, setPage] = useState(event.page || "")
	const [notifications, setNotifications] = useState(event.nv_notifications)
	const [visitors, setVisitors] = useState(event.public_visitors)

	const handleSubmit = () => {
		const dt = new Date(`${date} ${time}:00`)
		const offset = dt.getTimezoneOffset() * 60 * 1000
		const utcTime = new Date(dt.setTime(dt.getTime() + offset))
		const utcDate = `${utcTime.getFullYear()}-${
			utcTime.getMonth() + 1
		}-${utcTime.getDate()} ${
			(utcTime.getHours() < 10 ? "0" : "") + utcTime.getHours()
		}:${(utcTime.getMinutes() < 10 ? "0" : "") + utcTime.getMinutes()}`

		const mapsResponse = axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location[0]},${location[1]}&key=${process.env.GOOGLE_API_KEY}`
		)
		const overallResponse = mapsResponse.then(
			(res) => {
				const data = new FormData()
				data.append("_method", "PATCH")
				data.append("title", title)
				data.append("description", description)
				data.append("format", format)
				data.append("theme", theme)
				data.append("price", price)
				data.append("page", page)
				data.append("nv_notifications", notifications ? 1 : 0)
				data.append("public_visitors", visitors ? 1 : 0)
				data.append("location[]", location[0])
				data.append("location[]", location[1])
				poster && data.append("image", poster)
				data.append("date", utcDate)
				data.append("address", res.data.results[0].formatted_address)
				return axios
					.post(`${process.env.API_URL}/events/${event.id}`, data, {
						headers: {
							"Content-Type": "multipart/form-data",
							Accept: "application/json",
							Authorization: user.token,
						},
					})
					.then(() =>
						router.replace(`/user/${user.name}/events/${event.id}`)
					)
			},
			(err) => console.log(err.response)
		)
		toast.promise(overallResponse, { loading: "Updating..." })
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
			case "notifications":
				setNotifications(e.checked)
				break
			case "visitors":
				setVisitors(e.checked)
				break
			case "poster":
				const image = document.querySelector("#poster").files[0]
				if (image) {
					const fileReader = new FileReader()
					fileReader.readAsDataURL(image)
					fileReader.addEventListener("load", function () {
						setPosterSrc(this.result)
					})
					setPoster(image)
				}
				break
		}
	}

	return (
		<Application user={user} title='Edit your event'>
			<div className={style.createPage}>
				<h1 className={style.createHead}>Update your event!</h1>
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
							required
							className={style.eventCreateSelect}
							onChange={(e) => handleChange(e.target)}
						>
							<option>Conference</option>
							<option>Seminar</option>
							<option>Workshop</option>
							<option>Class</option>
							<option>Party</option>
							<option>Fest</option>
							<option>Con</option>
							<option>Show/Expo</option>
						</select>
					</label>
					<label className={style.eventCreateLabel}>
						Theme
						<select
							value={theme}
							name='theme'
							required
							className={style.eventCreateSelect}
							onChange={(e) => handleChange(e.target)}
						>
							<option>Business</option>
							<option>Politics</option>
							<option>Psychology</option>
							<option>Education</option>
							<option>Entertainment</option>
							<option>Music</option>
							<option>Art</option>
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
							placeholder='20.00'
							min='0'
							max='99.99'
						/>
					</label>
					<label className={style.eventCreateLabel}>
						Enable notifications
						<input
							name='notifications'
							checked={notifications}
							onChange={(e) => handleChange(e.target)}
							type='checkbox'
						/>
					</label>
					<label
						className={style.eventCreateLabel}
						title='Set whether everyone on the service should see the list of your visitors'
					>
						Enable public visitors
						<input
							name='visitors'
							checked={visitors}
							onChange={(e) => handleChange(e.target)}
							type='checkbox'
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
							placeholder='https://t.me/mygroup'
							pattern='https://.*'
							maxLength='64'
						/>
					</label>
					<label className={style.eventCreateLabel}>
						Location
						<Map location={location} setLocation={setLocation} />
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
					<div className={style.eventCreateLabel}>
						Poster
						<div className={style.eventCreatePoster}>
							<label htmlFor='poster'>Upload a poster</label>
							<input
								id='poster'
								name='poster'
								onChange={(e) => handleChange(e.target)}
								type='file'
								accept='image/png, image/jpg, image/jpeg'
							/>
							{posterSrc ? (
								<Image
									src={posterSrc}
									alt='posterPreview'
									width={300}
									height={400}
									layout='fixed'
									quality={100}
									objectFit='cover'
								/>
							) : null}
						</div>
					</div>
					<input
						className={style.eventCreateSubmit}
						type='submit'
						value='Update event'
					/>
				</form>
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	const user = cookie && JSON.parse(cookie)

	if (!!!cookie || user.name !== ctx.params.name)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	const response = await axios.get(
		`${process.env.API_URL}/events/${ctx.params.id}`
	)

	return {
		props: {
			user,
			event: response.data,
		},
	}
}

export default Edit
