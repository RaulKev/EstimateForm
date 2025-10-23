import { EstimagePage } from './features/estimate/page/EstimagePage';

function App() {
    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className='max-w-4xl mx-auto py-6 px-4'>
                <h1 className='text-center text-2xl font-bold text-gray-900 mb-8'>
                    Cotización por lo que conduces
                </h1>
                <div className='bg-white shadow-md rounded-lg p-6'>
                    <EstimagePage />
                </div>
            </div>
        </div>
    );
}

export default App;
