import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { NotFoundScreen } from './screens/not-found';
import ArtWorksScreen from './screens/listing';
import DetailScreen from './screens/detail';
import { Modal } from './components/modal';

function App() {
  return (
    <div>
      <header className=" bg-gray-300 w-full">
        <div className="w-full md:max-w-6xl m-auto py-4 px-4 flex flex-row justify-between items-center">
          <Link to="/" className=" no-underline cursor-pointer">
            <h1 className=" text-2xl md:text-4xl text-left md:text-center uppercase cursor-pointer font-extrabold">
              ArtWork Collection
            </h1>
          </Link>
          <Modal title={'Become a member?'}>
            <ModelContent />
          </Modal>
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

function ModelContent() {
  return (
    <div className=" py-4 text-sm divide-y">
      <p className=" pb-4">
        Members support the museum’s mission while enjoying yearlong free
        admission for themselves, their children, and guests—plus so much more!
      </p>
      <div className="flex flex-col gap-3 divide-y">
        <div className="flex flex-col md:flex-row justify-start gap-x-4 py-4 w-full">
          <div className="w-full md:w-32 flex flex-col gap-y-2">
            <p className=" text-lg font-semibold">Member Levels</p>
            <p className="font-thin">$115–$1,600</p>
          </div>
          <div className="flex-1">
            <p>
              Be the first to learn about special exhibitions with Member
              Previews and lectures.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-start gap-x-4 py-4 w-full">
          <div className="w-full md:w-32 flex flex-col gap-y-2">
            <p className=" text-lg font-semibold">Luminary</p>
            <p className=" font-thin">$3,000+</p>
          </div>
          <div className="flex-1">
            <p>
              Be the first to learn about special exhibitions with Member
              Previews and lectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<ArtWorksScreen />} />
      <Route path="/detail/:artWorkId" element={<DetailScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export { App };
