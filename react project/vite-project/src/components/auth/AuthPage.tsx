import { useState } from "react";
import Enter from "./Enter";
import Registration from "./Registration";

const AuthPage:React.FC = () => {
    const [IsFirstComponent, SetIsFirstComponent] = useState<boolean>(true);

    const toggleComponents = () =>{
        SetIsFirstComponent(!IsFirstComponent);
    }

    return (
        <>
            {IsFirstComponent ? <Enter onClick={toggleComponents}/> : <Registration onClick={toggleComponents}/>}
        </>
    );
};

export default AuthPage;