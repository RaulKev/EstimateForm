import { EstimateFlow } from './features/estimate/components/EstimateFlow';

function App({ storeToken }: { storeToken?: string }) {
    return (
            <div className=' min-h-screen max-w-4xl mx-auto py-6 '>
                <div className='rounded-lg'>
                    <EstimateFlow storeToken={storeToken} />
                </div>
            </div>
    );
}

export default App;
