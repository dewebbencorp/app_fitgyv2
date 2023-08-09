

export const FullScreenImage = ({ Image, setModal }: any) => {

    const close = () => {
        setModal(false)
    }
    return (<>
        <h1>hello full screen </h1>
        <img src={Image} />

        <button onClick={close}>cerrar x</button>
    </>)
}
