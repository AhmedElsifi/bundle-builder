import Builder from "./components/Builder/Builder";
import ReviewPanel from "./components/Review/ReviewPanel";

function App() {
  return (
    <div className="w-299 mx-auto my-12 px-4 flex flex-row gap-7.25 max-sm:w-full max-sm:flex-col max-sm:mx-0 max-sm:p-0">
      <Builder />
      <ReviewPanel />
    </div>
  );
}

export default App;
