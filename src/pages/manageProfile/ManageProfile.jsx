import { useContext, useEffect, useState } from "react"
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

export default function ManageProfile() {

    const nami = useNavigate()
    const [ loading, setLoading ] = useState(true) 
    const [backgroundBase64, setBackgroundBase64] = useState('')
    const [avatarBase64, setAvatarBase64] = useState('')
    const [backgroundPESC, setBackgroundPESC] = useState('')
    const [avatarPESC, setAvatarPESC] = useState('')
    const [converteuBackground, setConverteuBackground] = useState(false)
    const [converteuAvatar, setConverteuAvatar] = useState(false)
    const { user } = useContext(UserContext);
    const id = user._id
    const {
        register: registerProfile,
        handleSubmit: handleRegisterProfile, setValue,
        formState: {errors: errorsRegisterProfile},
    } = useForm({resolver: zodResolver(ProfileSchema)})

    const handleImageChange = (e, type) => {
        const file = e.target.files[0]
    
        if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]
                if (type === 'background') {
                    setBackgroundBase64(base64String)
                    setConverteuBackground(true)
                } else if (type === 'avatar') {
                    setAvatarBase64(base64String)
                    setConverteuAvatar(true)
                }
            }
            reader.readAsDataURL(file)
        } else {
            alert('por favor, selecione uma imagem válida com tamanho máximo de 5MB')
        }
    }

    async function EditProfileSubmit(data){
        try{
            if (!backgroundBase64 && !avatarBase64) {
                return alert('é necessário anexar uma imagem')
            }
            setLoading(true)    

            if(converteuBackground){
                data.background = backgroundBase64
            }

            if(converteuAvatar) {
                data.avatar = avatarBase64
            }
            
            await editProfile(id, data)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
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

    useEffect(() => {
        const determineImageType = (imageUrl) => {
            if (imageUrl.includes('data:image/png')) {
                return 'image/png'
            } else if (imageUrl.includes('data:image/jpeg')) {
                return 'image/jpeg'
            } else {
                return 'image/*'
            }
        }
    
        const backgroundSrc = user.background.startsWith('data:') 
            ? user.background 
            : `data:${determineImageType(user.background)};base64,${user.background}`
        setBackgroundPESC(backgroundSrc)
    
        const avatarSrc = user.avatar.startsWith('data:') 
            ? user.avatar 
            : `data:${determineImageType(user.avatar)};base64,${user.avatar}`
        setAvatarPESC(avatarSrc)
    }, [user.avatar, user.background])

    return(

        <EditProfileContainer>

        <ProfileHeader>
            <ProfileBackground src={backgroundPESC} alt="background do user" />

            <ProfileUser>
                <ProfileAvatar src={avatarPESC} alt="avatar do user" />
                <h2> {user.name} </h2>
                <h3>@{user.userName} </h3>
            </ProfileUser>
        </ProfileHeader>

            <h1>edite aqui o seu perfil</h1>
            <form onSubmit={handleRegisterProfile(EditProfileSubmit)}>
                <label> background </label>
                <Input
                    type='file'
                    placeholder='banner'
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'background')}
                    name='background'   
                    register={registerProfile}
                />
                {errorsRegisterProfile.background && <ErrorSpan> errorsRegisterProfile.background.message </ErrorSpan>}

                <label> avatar </label>
                <Input
                    type='file'
                    placeholder='avatar'
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'avatar')}
                    name='avatar'
                    register={registerProfile}
                />
                {errorsRegisterProfile.avatar && <ErrorSpan> errorsRegisterProfile.avatar.message </ErrorSpan>}

                <Button type='submit' text='editar' />

            </form>
        </EditProfileContainer>
    )
}