import {UserSignIn, UserSignUp} from "@/utils/packages/apis/auth.api";
import {DynamicForm} from "@/components/form";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "@/context/AuthContext";

const SignInPage = () => {
    const { signin } = useContext(AuthContext)

    const inputs = [{
        type: "email",
        name: "email",
    },{
        type: "password",
        name: "password",
    }]

    return (
        <div className="flex justify-center">
            <DynamicForm
                inputs={inputs}
                onSubmit={signin} />
        </div>
    );
}

export default SignInPage;