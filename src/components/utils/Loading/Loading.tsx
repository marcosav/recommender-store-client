import React from 'react'

import { useTranslation } from 'react-i18next'

import ContentLoader from 'react-content-loader'

const Loading = () => {
    const { t } = useTranslation()

    return (
        <ContentLoader
            viewBox="0 0 300 100"
            height={100}
            width={300}
            style={{ margin: 'auto' }}
        >
            <text
                x="40"
                y="65"
                style={{
                    fontSize: 50,
                    fontWeight: 'bold',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                }}
            >
                {t('info.loading')}
            </text>
        </ContentLoader>
    )
}

export default Loading
