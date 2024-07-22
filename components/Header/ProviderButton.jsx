import React from "react";

function ProviderButton({ provider, signIn }) {
	return (
		<li>
			<button
				type="button"
				onClick={() => signIn(provider.id)}
				className="btn btn-outline btn-secondary"
			>
				Sign In with {provider.name}{" "}
			</button>
		</li>
	);
}

export default ProviderButton;
