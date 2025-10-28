import { EstimagePage } from './features/estimate/page/EstimagePage';

function App({ storeToken }: { storeToken?: string }) {
    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className='max-w-4xl mx-auto py-6 '>
                <div className='bg-white rounded-lg p-6'>
                    <EstimagePage storeToken={storeToken} />
                </div>
            </div>
        </div>
    );
}

export default App;
