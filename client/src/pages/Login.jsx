import LoginForm from "../components/LoginForm";

export default function Login() {
    return(
        <div className="h-screen w-screen md:max-w-md m-auto flex flex-col justify-center">
            <div className="bg-base-300 rounded-xl">
                <LoginForm />
            </div>
        </div>
    )
}