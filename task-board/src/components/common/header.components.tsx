import img from "../../assets/maple.png";

const MapleHeaderComponent = () => {
  return (
    <>
      <nav className="bg-slate-200  ">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
          <div className="flex flex-wrap items-center justify-evenly md:justify-between">
            <a
              href="https://mapleleapgroups.com.np/"
              className="flex items-center"
            >
              <img src={img} className="h-12" alt="Maple Logo" />
            </a>

            <p className="block py-2  text-red-700 rounded font-bold text-2xl">
              TASK BOARD
            </p>
            <p className="block py-2  text-red-700 rounded font-bold text-2xl">
              INTERNSHIP TASK
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MapleHeaderComponent;
