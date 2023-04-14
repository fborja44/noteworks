import { getAuth } from "firebase/auth";
import firebaseApp from "./Firebase";

const createToken = async () => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export { createToken };
