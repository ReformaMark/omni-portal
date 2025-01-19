import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

const CustomPassword = Password({
  profile(params) {
    return {
      email: params.email as string,
      fname: params.fname as string,
      lname: params.email as string,
      contact: params.contact as string,
      houseNumber: params.houseNumber as string,
      street: params.street as string,
      barangay: params.barangay as string,
      city: params.city as string,
    }
  }
})

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomPassword],
});
