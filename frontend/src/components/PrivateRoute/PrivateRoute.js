import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
	const isAuthenticated = localStorage.getItem("token");
	console.log("Checking authentication, token:", isAuthenticated);

	if (!isAuthenticated) {
		console.log("Not authenticated, navigating to root.");
		return <Navigate to="/" replace />;
	}

	console.log("Authenticated, rendering children.");
	return children;
}

export default PrivateRoute;
