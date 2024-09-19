import { RingLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div>
            <RingLoader
            color="#2885E2FF"
            loading
            size={200}
            speedMultiplier={0.5}
        /></div>
    )
}

export default Loader;