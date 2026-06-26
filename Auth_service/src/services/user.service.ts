import { LoginDto, RefreshTokenDto } from "../dto/login.dto";
import { SignupDto } from "../dto/signup.dto";
import { fetchUserProfile, loginUser, refreshAccessToken, userCreation } from "../repositories/user.repository";
import { logoutUser } from "../repositories/user.repository";
import { LogoutDto } from "../dto/login.dto";

export const registerService = async(payload: SignupDto) => {
    const newUser = await userCreation(payload);
    return newUser;
}    

export const loginUserService = async(payload: LoginDto) => {
    const loggedInUser = await loginUser(payload);
    return loggedInUser;
}

export const refreshTokenService = async (
    payload: RefreshTokenDto
) => {

    return await refreshAccessToken(payload);

}

export const getProfileService = async(payload: any) => {
    const profileDetails = await fetchUserProfile(payload);
    return profileDetails;
}

export const logoutService = async (
    payload: LogoutDto
) => {

    return await logoutUser(payload);

}