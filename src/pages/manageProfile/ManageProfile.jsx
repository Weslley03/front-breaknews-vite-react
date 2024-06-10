import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { EditProfileContainer } from "./ManageProfileStyled";
import { Input } from "../../components/InputCompo/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSpan } from "../../components/navbar/NavbarStyled";
import { Button } from "../../components/Button/Button";
import { ProfileSchema } from '../../Schemas/ProfileSchema.js'
import { ProfileHeader, ProfileUser, ProfileAvatar, ProfileBackground } from "../profile/ProfileStyled.jsx";
import { findUserByIdService, editProfile } from "../../services/userServices.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ManageProfile() {

    const nami = useNavigate()
    const { user } = useContext(UserContext);
    const id = user._id
    const {
        register: registerProfile,
        handleSubmit: handleRegisterProfile, setValue,
        formState: {errors: errorsRegisterProfile},
    } = useForm({resolver: zodResolver(ProfileSchema)})

    async function EditProfileSubmit(data){
        try{
        await editProfile(id, data)
        }catch(err){
            console.log(err)
        } finally{
            nami('/profile')
        }
    }

    async function getUserByid(){
        try{
            const { data } = await findUserByIdService(id)
            setValue('background', data.background)
            setValue('avatar', data.avatar)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getUserByid()
    }, [])

    return(

        <EditProfileContainer>

        <ProfileHeader>
            <ProfileBackground src={user.background} alt="background do user" />

            <ProfileUser>
                <ProfileAvatar src={user.avatar} alt="avatar do user" />
                <h2> {user.name} </h2>
                <h3>@{user.userName} </h3>
            </ProfileUser>
        </ProfileHeader>

            <h1>edite aqui o seu perfil</h1>
            <form onSubmit={handleRegisterProfile(EditProfileSubmit)}>
                <Input
                    type='text'
                    placeholder='link do banner'
                    name='background'
                    register={registerProfile}
                />
                {errorsRegisterProfile.background && <ErrorSpan> errorsRegisterProfile.background.message </ErrorSpan>}

                <Input
                    type='text'
                    placeholder='link do avatar'
                    name='avatar'
                    register={registerProfile}
                />
                {errorsRegisterProfile.avatar && <ErrorSpan> errorsRegisterProfile.avatar.message </ErrorSpan>}

                <Button type='submit' text='editar' />

            </form>
        </EditProfileContainer>
    )
}