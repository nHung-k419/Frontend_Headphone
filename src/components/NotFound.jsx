import Lottie from "lottie-react";
import Nodata from "../assets/No-Data.json";
const NotFound = () => {
  return (
    <div className="mt-20">
      <div className="flex justify-center items-center">
        {/* <img src={Logo404} alt="Logo 404" className="w-64 h-auto  bemUpanimation" />
         */}
        <Lottie
          animationData={Nodata}
          loop={true}
          className="w-50 h-50" 
        />
      </div>
    </div>
  )
}

export default NotFound