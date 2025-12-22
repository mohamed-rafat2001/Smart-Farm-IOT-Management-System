function sendCookie(res, token) {
	const cookieOptions = {
		expires: token 
            ? new Date(Date.now() + (process.env.COOKIEEXPIRE || 90) * 24 * 60 * 60 * 1000)
            : new Date(0),
		httpOnly: true,
		sameSite: 'none', // Required for cross-site cookies, or Lax for same-site
		path: '/',
		secure: true, // Always true for production/Vercel
	};

	if (!token) {
        // Clear cookie using EXACTLY the same options
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
