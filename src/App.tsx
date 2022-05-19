import {useEffect, useState} from 'react'
import {useIdleTimer} from "react-idle-timer";

function App() {
    // Set timeout values
    const timeout = 1000 * 15
    const promptTimeoutSeconds = 15
    const promptTimeout = 1000 * promptTimeoutSeconds

    // Modal open state
    const [open, setOpen] = useState(false);



    // Time before idle
    const [remaining, setRemaining] = useState(0)

    const onPrompt = () => {
        console.log('@ON PROMPT')
        setOpen(true)
        setRemaining(promptTimeoutSeconds)
    }

    const onIdle = () => {
        console.log('@ON IDLE')
        setOpen(false)
        setRemaining(0);
    }

    const onActive = () => {
        console.log('@ON ACTIVE')
        setOpen(false)
        setRemaining(0)
    }

    const {getRemainingTime, isPrompted, start, pause, resume, reset} = useIdleTimer({
        timeout,
        promptTimeout,
        onPrompt,
        onIdle,
        onActive,
        //startOnMount: false,
        startManually: true,
        stopOnIdle: true
    })

    const handleStillHere = () => {
        setOpen(false)
        reset()
    }

    const handleLogout = () => {

    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPrompted()) {
                setRemaining(Math.ceil(getRemainingTime() / 1000))
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [getRemainingTime, isPrompted])


    useEffect(() => {
        const loggerInterval = setInterval(() => {
            // if(timerStarted){
                console.log('@getRemainingTime ', getRemainingTime()/1000)
           // }
        }, 1000)

        return () => {
            clearInterval(loggerInterval)
        }

    }, [])

    return (
        <div style={{padding: 16}}>
            <h1>Use React Idle Timer</h1>

            <div style={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
                <button onClick={() => {
                    console.log('Starting Timer...')
                    start();
                }}>
                    Start Timer
                </button>

                <button onClick={() => {
                    console.log('Pausing Timer...')
                    pause();
                }}>
                    Pause Timer
                </button>

                <button onClick={() => {
                    console.log('Resume Timer...')
                    resume();
                }}>
                    Resume Timer
                </button>

                <button onClick={() => {
                    console.log('Reset Timer...')
                    reset();
                }}>
                    Reset Timer
                </button>
            </div>



            <div className='modal' style={{display: open ? 'block' : 'none', background: '#e53e3e', color: 'white', padding: '8px', marginTop: 16}}>
                <p>Logging you out in {remaining} seconds</p>

                <div style={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
                    <button onClick={handleStillHere}>Im Still Here</button>
                    <button onClick={handleStillHere}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default App
