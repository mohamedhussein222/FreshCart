import { useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { dataContext } from "../../Context/ContextStore"

export default  function ProtectedRoute(props) {
 let{user}= useContext(dataContext)
   let navigate=useNavigate()
    console.log(props.children)
      if (localStorage.getItem('tkn') == null&&user==null) {
   return    <Navigate to="/login"/>
      }
      else{
        return props.children ;
      }
    return (
        <>
            
        </>
    )
}
