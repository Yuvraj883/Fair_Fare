function Form() {
  return (
    <>
      <form>
        <div className="w-full items-center flex flex-col justify-center my-4">
          <input
            className="block border-2 border-black h-10 w-64 p-2"
            placeholder="Pick up location"
          />
          <br />
          <input
            className="border-2 border-black h-10 w-64 p-2"
            placeholder="Drop location"
          />
          <br />
          <div className="flex">
            <label className="mx-2">Luggage: </label>
            <input type="checkbox" />
          </div>
          <button
            className="bg-green-500 px-4 py-2 text-white font-bold w-64 my-2"
            type="submit"
          >
            Search
            <img src="https://cdn-icons-png.flaticon.com/512/1183/1183845.png"
            className="inline w-6 mx-2 font-size text-xs"/>
          </button>
        </div>
      </form>
    </>
  );
}
export default Form;
