import { Redirect, Route } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({component: Component, ...rest}) => {
    
    const { currentUser } = useAuth();

    return (
        <Route 
            {...rest}
            render={(props) => {
                if(!currentUser){
                    return <Redirect to="/signin"/>
                }
                return <Component { ...props } />
            }}
        />
    )
}

export default ProtectedRoute;
