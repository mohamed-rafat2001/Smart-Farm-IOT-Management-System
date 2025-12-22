function sendCookie(res, token) {
	const cookieOptions = {
		expires: token 
            ? new Date(Date.now() + process.env.COOKIEEXPIRE * 24 * 60 * 60 * 1000)
            : new Date(0),
		httpOnly: true,
		sameSite: 'none',
		path: '/',
		secure: true,
	};

	if (!token) {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: 'none',
            path: '/',
            secure: true,
        });
    } else {
        res.cookie("token", token, cookieOptions);
    }
}
export default sendCookie;
