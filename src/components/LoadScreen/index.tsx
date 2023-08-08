import { HashLoader } from "react-spinners"
import './loading.css'
export const Loading = () => {

    return (
        <>

                <div className="loading-indicator-login">

                    <HashLoader
                        color={"var(--ion-tab-bar-background)"}
                        loading={true}
                        speedMultiplier={3}
                        size={80}
                    />

                </div>
            
        </>

    )


}