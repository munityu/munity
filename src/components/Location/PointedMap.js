import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

const mapContainerStyle = {
	height: "400px",
	width: "100%",
	borderRadius: "14px",
	marginTop: "8px",
}
const libraries = ["places"]

const PointedMap = ({ location }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.GOOGLE_API_KEY,
		libraries: libraries,
	})

	if (loadError) return "Error"
	if (!isLoaded) return "Loading..."

	return (
		<div id='gmap'>
			<GoogleMap
				id='map'
				mapContainerStyle={mapContainerStyle}
				zoom={12}
				center={{ lat: location[0], lng: location[1] }}
			>
				<Marker position={{ lat: location[0], lng: location[1] }} />
			</GoogleMap>
		</div>
	)
}

export default PointedMap
