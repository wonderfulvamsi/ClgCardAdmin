import React from 'react'
import { Stack } from '@mui/material'
function Transac({ Date, From, To, Amount }) {
    return (
        <>
            <div className='transac'>
                <Stack spacing={-1} sx={{ width: '20%' }}>
                    <div style={{ color: '#F0F5F9', marginTop: '10%', marginBottom: '10%', fontSize: '120%', fontFamily: 'sans-serif' }}>
                        Date
                    </div>
                    <h4 style={{ color: '#F3F3F3', marginBottom: '10%', fontSize: '130%', fontFamily: 'sans-serif' }}>{Date}</h4>
                </Stack>
                <Stack spacing={-1} sx={{ width: '20%' }}>
                    <div style={{ color: '#F0F5F9', marginTop: '10%', marginBottom: '10%', fontSize: '120%', fontFamily: 'sans-serif' }}>
                        From
                    </div>
                    <h4 style={{ color: '#F3F3F3', marginBottom: '10%', fontSize: '130%', fontFamily: 'sans-serif' }}>{From}</h4>
                </Stack>
                <Stack spacing={-1} sx={{ width: '20%' }}>
                    <div style={{ color: '#F0F5F9', marginTop: '10%', marginBottom: '10%', fontSize: '120%', fontFamily: 'sans-serif' }}>
                        To
                    </div>
                    <h4 style={{ color: '#F3F3F3', marginBottom: '10%', fontSize: '130%', fontFamily: 'sans-serif' }}>{To}</h4>
                </Stack>
                <Stack spacing={-1} sx={{ width: '20%' }}>
                    <div style={{ color: '#F0F5F9', marginTop: '10%', marginBottom: '10%', fontSize: '120%', fontFamily: 'sans-serif' }}>
                        Amount
                    </div>
                    <h4 style={{
                        color: '#F3F3F3',
                        textAlign: 'left',
                        marginBottom: 10, fontSize: '130%', fontFamily: 'sans-serif'
                    }}>{Amount}</h4>
                </Stack>
            </div>
        </>
    )
}

export default Transac