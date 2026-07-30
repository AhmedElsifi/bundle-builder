import Builder from "./components/Builder/Builder";
import ReviewPanel from "./components/Review/ReviewPanel";

function App() {
  return (
    <div className="w-299 mx-auto my-12 px-4 flex flex-row gap-7.25 max-md:w-full max-md:flex-col max-md:mx-0 max-md:p-0 max-md:my-0 max-xl:flex-col md:max-xl:w-9/10">
      <div className="sm:hidden text-[32px] font-bold text-center mt-7.75 mb-5">
        <h1>Let’s get started!</h1>
      </div>
      <Builder />
      <ReviewPanel />
    </div>
  );
}

export default App;
