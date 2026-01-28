import { APP_NAME, APP_TAGLINE } from '../../config';

export function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{APP_NAME}</h1>
            <p className="text-sm text-blue-100">{APP_TAGLINE}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
