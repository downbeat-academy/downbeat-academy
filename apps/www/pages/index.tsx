import { Button } from '@downbeat-academy/cadence-core'

export default function Home() {
    return (
        <>
            <p>App</p>           
            <Button text='Button text' onClick={() => alert('You clicked the button')}/>
        </>
    )
}
