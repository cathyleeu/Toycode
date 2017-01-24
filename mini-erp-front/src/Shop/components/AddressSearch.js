import React from 'react'
import './AddressSearch.css'

const AddressSearch = ({isModalOpen, closeModal, children}) => (

		<div style={{display: isModalOpen ? 'block' : 'none'}} className="outerStyle">
			<div className="overlay" onClick={closeModal}></div>
			<div onClick={closeModal}></div>
			<div className="searchModal">
					{children}
			</div>
		</div>
	)



export default AddressSearch
