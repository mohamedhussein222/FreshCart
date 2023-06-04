import { useContext } from "react"
import { dataContext } from "../../Context/ContextStore"

export default  function Profile() {
    
 let {user,numProductCart} = useContext(dataContext);
 console.log(user)
    return (
        <>
            <div className="container  py-5 ">
                <h1 className="text-center py-3">Welcome {user.name}{numProductCart}</h1>
            </div>
            
        </>
    )
}
