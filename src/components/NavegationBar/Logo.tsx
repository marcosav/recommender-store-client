import React from 'react'

import SvgIcon from '@material-ui/core/SvgIcon'

const LogoIcon = (props: any) => (
    <SvgIcon width={512} height={512} viewBox="0 0 512 512" {...props}>
        <path
            d="M304,128H16c-8.832,0-16,7.168-16,16v304c0,35.296,28.704,64,64,64h240c8.832,0,16-7.168,16-16V144  C320,135.168,312.832,128,304,128z"
            fill="#ffc107"
            data-original="#ffc107"
        />
        <path
            d="M496,256H240c-8.832,0-16,7.168-16,16v176c0,35.296,28.704,64,64,64h160c35.296,0,64-28.704,64-64  V272C512,263.168,504.832,256,496,256z"
            fill="#2196f3"
            data-original="#2196f3"
        />
        <g>
            <path
                d="M240,192c-8.832,0-16-7.168-16-16V96c0-35.296-28.704-64-64-64S96,60.704,96,96v80   c0,8.832-7.168,16-16,16s-16-7.168-16-16V96c0-52.928,43.072-96,96-96s96,43.072,96,96v80C256,184.832,248.832,192,240,192z"
                fill="#455a64"
                data-original="#455a64"
            />
            <path
                d="M432,320c-8.832,0-16-7.168-16-16v-64c0-26.464-21.536-48-48-48s-48,21.536-48,48v64   c0,8.832-7.168,16-16,16s-16-7.168-16-16v-64c0-44.096,35.872-80,80-80s80,35.904,80,80v64C448,312.832,440.832,320,432,320z"
                fill="#455a64"
                data-original="#455a64"
            />
        </g>
    </SvgIcon>
)

export default LogoIcon
