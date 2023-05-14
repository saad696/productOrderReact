import { RouterProvider } from 'react-router';
import { CustomLayout } from './components';
import { router } from './routes/routes';

function App() {
    return (
        <>
            <CustomLayout>
                <RouterProvider router={router} />
            </CustomLayout>
        </>
    );
}

export default App;
