import {DynamicForm} from "../../components/form";
import {UserSignUp} from "../../utils/packages/apis/auth.api";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        await UserSignUp(data)
        navigate('/signin');
    };

    const inputs = [{
        type: "text",
        name: "username",
    },{
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
                onSubmit={onSubmit} />
        </div>
    );
}

export default SignUpPage;