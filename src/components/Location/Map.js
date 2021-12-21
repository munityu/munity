import { useState, useRef } from "react"
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api"
import { LocateMarker } from "../../lib/icons/Misc.jsx"
import PlacesSearch from "./PlacesSearch"

const mapContainerStyle = {
	height: "400px",
	width: "100%",
	borderRadius: "14px",
	marginTop: "8px",
}
const options = {
	disableDefaultUI: true,
	zoomControl: true,
}
const libraries = ["places"]

const Map = ({ location, setLocation }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.GOOGLE_API_KEY,
		libraries: libraries,
	})
	const [marker, setMarker] = useState(
		location ? [{ lat: location[0], lng: location[1] }] : []
	)
	const [selected, setSelected] = useState(null)
	const [center, setCenter] = useState(
		location
			? { lat: location[0], lng: location[1] }
			: { lat: 49.98, lng: 36.23 }
	)

	const onMapClick = (e) => {
		setMarker([
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
			},
		])
		setLocation([e.latLng.lat(), e.latLng.lng()])
	}

	const mapRef = useRef()
	const panTo = ({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng })
		mapRef.current.setZoom(14)
	}

	const onMapLoad = (map) => {
		mapRef.current = map
	}

	if (loadError) return "Error"
	if (!isLoaded) return "Loading..."

	return (
		<div style={{ position: "relative" }}>
			<PlacesSearch
				panTo={panTo}
				setLocation={setLocation}
				setMarker={setMarker}
				setCenter={setCenter}
			/>
			<GoogleMap
				id='map'
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			>
				{marker.map((mk) => (
					<Marker
						key={`${mk.lat}-${mk.lng}`}
						position={{ lat: mk.lat, lng: mk.lng }}
						onClick={() => {
							setSelected(mk)
						}}
					/>
				))}
				{selected ? (
					<InfoWindow
						position={{ lat: selected.lat, lng: selected.lng }}
						onCloseClick={() => {
							setSelected(null)
						}}
					>
						<div>
							<h2>
								<span role='img' aria-label='bear'>
									🐻
								</span>{" "}
								Alert
							</h2>
							<p>Spotted s</p>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
			<Locate panTo={panTo} />
		</div>
	)
}

const Locate = ({ panTo }) => {
	return (
		<button
			style={{
				width: "38px",
				height: "38px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				position: "absolute",
				top: "4rem",
				right: "0.5rem",
				background: "white",
				zIndex: "1",
				border: "2px solid #e0e3f6",
				borderRadius: "8px",
				overflow: "hidden",
			}}
			title='Get my location'
			onClick={() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						panTo({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						})
					},
					() => null
				)
			}}
		>
			<LocateMarker style={{ width: 26 }} />
		</button>
	)
}

export default Map
