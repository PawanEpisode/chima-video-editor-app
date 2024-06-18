import React from 'react'

import { Result, Button } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

const Page403 = () => {
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
            status="403"
            subTitle={`Sorry,  ${location.state || 'you are not authorized to access this page.'}`}
            title="403"
        />
    )
}

export default Page403