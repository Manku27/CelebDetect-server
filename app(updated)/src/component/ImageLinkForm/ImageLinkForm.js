import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return(
		<div>
			<p className='f3 abc'>
			{'This Magic Panda will detect faces in your pictures.'}
			</p>
			<div className='abc'>
			  <div className= 'form abc pa4 br3 shadow-5'>
				<input type='tex' className='f4 pa2 w-70 center' onChange={onInputChange} />
				<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
			  </div>
			</div>
		</div>
	)

}
export default ImageLinkForm;