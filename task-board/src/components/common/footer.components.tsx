import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const MapleFooterComponent = () => {
  return (
    <>
      <div className="bg-rose-600">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
          <div className="flex flex-wrap  items-center justify-evenly md:justify-between">
            <div className="flex flex-wrap items-center justify-evenly md:gap-10">
              <p className="md:w-72   text-white font-bold text-2xl text-center my-4">
                Lets Get Connected
              </p>
            </div>

            <div className="flex gap-4 my-4">
              <a href="https://www.facebook.com/profile.php?id=100039276677358&ref=embed_page">
                <FaFacebook className="text-4xl" />
              </a>
              <a href="">
                <FaInstagram className="text-4xl" />
              </a>
              <a href="https://www.linkedin.com/company/maple-leap-groups/posts/?feedView=all">
                <FaLinkedin className="text-4xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapleFooterComponent;
