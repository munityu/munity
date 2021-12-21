import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete"

const style = {
	width: "100%",
	height: "40px",
	fontSize: "16px",
	border: "1px solid #ccd1f5",
	borderRadius: "8px",
	padding: "0 8px",
	background: "rgb(250, 249, 250)",
}

const PlacesSearch = ({ panTo, setLocation, setMarker, setCenter }) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		debounce: 300,
	})

	const handleInput = (e) => {
		setValue(e.target.value)
	}

	const handleSelect =
		({ description }) =>
		() => {
			setValue(description, false)
			clearSuggestions()

			getGeocode({ address: description })
				.then((results) => getLatLng(results[0]))
				.then(({ lat, lng }) => {
					panTo({ lat, lng })
					setLocation([lat, lng])
					setMarker([{ lat: lat, lng: lng }])
					setCenter({ lat, lng })
				})
				.catch((e) => console.log("😱 Error: ", e))
		}

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion

			return (
				<li key={place_id} onClick={handleSelect(suggestion)}>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			)
		})

	return (
		<>
			<input
				value={value}
				onChange={handleInput}
				disabled={!ready}
				style={style}
				placeholder='Where is the place?'
			/>
			{status === "OK" && <ul>{renderSuggestions()}</ul>}
		</>
	)
}

export default PlacesSearch
