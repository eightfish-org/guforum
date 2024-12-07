// Import using ES modules
import { AuthClient } from 'https://cdn.jsdelivr.net/npm/@dfinity/auth-client/lib/esm/index.js';
console.log(" user log js")
// The IDL definitions
const webapp_idl = ({ IDL }) => {
    return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
};

const init = ({ IDL }) => {
    return [];
};

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
    // Set default II URL
    const iiUrlInput = document.querySelector("#iiUrl");
    if (iiUrlInput) {
        iiUrlInput.value = "https://identity.ic0.app";
    }
});

// Login handler
const handleLogin = async () => {
    try {
        // Create AuthClient
        const authClient = await AuthClient.create();

        // Get II URL from input
        const iiUrlInput = document.querySelector("#iiUrl");
        const iiUrl = iiUrlInput?.value || "https://identity.ic0.app";

        // Handle login
        await new Promise((resolve, reject) => {
            authClient.login({
                identityProvider: iiUrl,
                onSuccess: resolve,
                onError: reject,
            });
        });

        // Get identity and principal
        const identity = authClient.getIdentity();
        console.log(`identity: ${identity}`);
        
        const userPrincipal = identity.getPrincipal().toString();
        console.log(`userPrincipal: ${userPrincipal}`);

        return { identity, userPrincipal };
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

// Add click handler
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById("loginBtn");
    console.log(`------loginBtn ${loginBtn}`)
    if (loginBtn) {
        loginBtn.addEventListener("click", handleLogin);
    }
});

// Export as ES modules
window.handleLogin = handleLogin;
export {
    init,
    webapp_idl,
    handleLogin
};