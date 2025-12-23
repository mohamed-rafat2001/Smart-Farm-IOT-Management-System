function sendCookie(res, token) {
	const cookieOptions = {
		httpOnly: true,
		sameSite: 'none',
		path: '/',
		secure: true,
	};

	if (!token || token === "loggedout" || token === "") {
		// Clear cookie with multiple methods for maximum compatibility
		res.cookie("token", "", {
			...cookieOptions,
			expires: new Date(0),
			maxAge: 0,
		});
		
		// Also use clearCookie as a backup
		res.clearCookie("token", cookieOptions);
	} else {
		res.cookie("token", token, {
			...cookieOptions,
			expires: new Date(
				Date.now() + (process.env.COOKIEEXPIRE || 90) * 24 * 60 * 60 * 1000
			),
		});
	}
}
export default sendCookie;
