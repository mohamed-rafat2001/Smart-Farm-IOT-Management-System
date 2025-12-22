function sendCookie(res, token) {
	const cookieOptions = {
		expires: token 
            ? new Date(Date.now() + process.env.COOKIEEXPIRE * 24 * 60 * 60 * 1000)
            : new Date(0), // Set to epoch (past) to clear the cookie
		httpOnly: true,
		sameSite: 'none',
		path: '/',
		secure: true,
	};

	res.cookie("token", token, cookieOptions);
}
export default sendCookie;
