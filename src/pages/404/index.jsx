import React from 'react'

import { Result, Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const Page404 = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleBackClick = () => {
        navigate(-1);  // Navigate back one step in the history
    };
    return (
        <Result
            extra={
                <Button
                    type="primary"
                    onClick={handleBackClick}
                >
                    Back
                </Button>
            }
            status="404"
            subTitle={`Sorry, ${location.state || 'the page you visited does not exist.'} `}
            title="404"
        />
    )
}

export default Page404