import { HashLoader, PuffLoader } from "react-spinners"
import './loading.css'
export const Loading = () => {

    return (
        <>

            <div className="loading-indicator-login">

                <PuffLoader
                    color={"var(--ion-tab-bar-background)"}
                    loading={true}
                    speedMultiplier={3}
                    size={80}
                />

            </div>

        </>

    )


}

export const Loading2 = () => {
    return (
        <>
            <div className="newtons-cradle">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
            </div>

        </>
    )
}