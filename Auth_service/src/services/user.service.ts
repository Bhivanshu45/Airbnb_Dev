import { LoginDto } from "../dto/login.dto";
import { SignupDto } from "../dto/signup.dto";
import { fetchUserProfile, loginUser, userCreation } from "../repositories/user.repository";

export const registerService = async(payload: SignupDto) => {
    const newUser = await userCreation(payload);
    return newUser;
}    

export const loginUserService = async(payload: LoginDto) => {
    const loggedInUser = await loginUser(payload);
    return loggedInUser;
}

export const getProfileService = async(payload: any) => {
    const profileDetails = await fetchUserProfile(payload);
    return profileDetails;
}