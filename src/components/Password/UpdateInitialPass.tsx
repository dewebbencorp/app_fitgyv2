import { useState } from "react"
import { ChangePassword } from "../Profile/ChangePassword"

export const UpdateInitialPass = () => {
    const [showFieldPw, setFieldPw] = useState(true)

    return (<>
        <div style={{ position: 'absolute', backgroundColor: '', display: 'flex', top: '20vh', bottom: '0', left: '0', right: '0', zIndex: 12 }}>
            <ChangePassword setPw={setFieldPw} />
        </div>

    </>)
} 