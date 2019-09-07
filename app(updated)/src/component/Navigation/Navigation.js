import React from 'react';

const Navigation =({onRouteChange, isSignedIn})=>{
		if(isSignedIn){
			return(
		<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick={() => {onRouteChange('SignOut')}} className='f3 link dim black underline p3 pointer'>sign out</p>
		</nav>);
	} else {
		return(
		<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick={() => {onRouteChange('SignIn')}} className='pa3 f3 link dim black underline p3 pointer'>sign in</p>
			<p onClick={() => {onRouteChange('SignUp')}} className='pa3 f3 link dim black underline p3 pointer'>sign up</p>
		</nav>);
	}
	}
export default Navigation;