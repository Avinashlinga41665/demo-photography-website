export default function Footer() {
  return (
    <footer className="bg-[#f5f1e8] text-gray-700 py-6 mt-20">
      <div className="flex flex-col items-center gap-4">

        <div className="flex gap-6 text-2xl">
          <a href="#" className="hover:text-black"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" className="hover:text-black"><i className="fa-brands fa-facebook"></i></a>
          <a href="#" className="hover:text-black"><i className="fa-brands fa-linkedin"></i></a>
          <a href="#" className="hover:text-black"><i className="fa-brands fa-youtube"></i></a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Photography Name. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
