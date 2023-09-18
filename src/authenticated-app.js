import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DogListScreen from './screens/listing';
import DogDetailScreen from './screens/detail';
import { NotFoundScreen } from './screens/not-found';

function AuthenticatedApp() {
  return (
    <div>
      <header className=" bg-gray-300 w-full">
        <div className="max-w-6xl m-auto py-4 px-4">
          <Link to="/" className=" no-underline cursor-pointer">
            <h1 className="text-2xl uppercase">Dog Breed Search</h1>
          </Link>
        </div>
      </header>
      <main className="w-full">
        <div className="max-w-6xl m-auto py-4 px-4">
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DogListScreen />} />
      <Route path="/detail/:breedId" element={<DogDetailScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default AuthenticatedApp;
