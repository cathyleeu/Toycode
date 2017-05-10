import React from 'react'

const OrderModal = ({isModalOpen, closeModal, children}) => (
	<div style={{display: isModalOpen ? 'block' : 'none'}} className="outerStyle">
		<div className="overlay" onClick={closeModal}></div>
		<div onClick={closeModal}></div>
		<div className="OrderModal">
			{children}
		</div>
	</div>
)



export default OrderModal
