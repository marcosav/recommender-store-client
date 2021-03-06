import React from 'react'

import Box from '@material-ui/core/Box'
import CircularProgress, {
    CircularProgressProps,
} from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const CircularProgressIndicator = (
    props: CircularProgressProps & { value: number }
) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress color="inherit" variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="inherit"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    )
}

export default CircularProgressIndicator
