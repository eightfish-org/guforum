/* A simple webapp that authenticates the user with Internet Identity and that
 * then calls the whoami canister to check the user's principal.
 */
import { AuthClient } from "@dfinity/auth-client";

// Autofills the <input> for the II Url to point to the correct canister.
document.body.onload = () => {
  let iiUrl = `https://identity.ic0.app`;
};

document.getElementById("loginBtn")?.addEventListener("click", async () => {
  // When the user clicks, we start the login process.
  // First we have to create and AuthClient.
  console.log(`clicked`);
  const authClient = await AuthClient.create();

  // Find out which URL should be used for login.
  const iiUrl = `https://identity.ic0.app`;

  // Call authClient.login(...) to login with Internet Identity. This will open a new tab
  // with the login prompt. The code has to wait for the login process to complete.
  // We can either use the callback functions directly or wrap in a promise.
  await authClient.login({
    identityProvider: iiUrl,
  });

  // At this point we're authenticated, and we can get the identity from the auth client:
  const identity = authClient.getIdentity();
  console.log(`identity: ${identity}`);
  // Get the principal
  const userPrincipal = identity.getPrincipal().toString();
  console.log(`userPrincipal: ${userPrincipal}`);

  // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
  //const agent = await HttpAgent.create({ identity, shouldFetchRootKey: true });
  // Using the interface description of our webapp, we create an actor that we use to call the service methods.
  //const webapp: _SERVICE = Actor.createActor(webapp_idl, {
  //  agent,
  //  canisterId: "rdmx6-jaaaa-aaaaa-aaadq-cai",
  //});
  // Call whoami which returns the principal (user id) of the current user.
  //const principal = await webapp.whoami();
  // show the principal on the page
  async function loginIIUser(userPrincipal) {
    const url = `/user/ii_auth_callback?account=${userPrincipal}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  await loginIIUser(userPrincipal);
});
