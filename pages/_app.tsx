import '../styles/tailwind.css';
import '../styles/nprogress.css';
import Image from "next/image";
import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({ trickleSpeed: 200 });
NProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
        {/* Footer */}
        <footer className="relative bottom-0 mt-28 w-full shadow-up p-3">
          <h1 className="text-sm text-center sm:text-base md:text-lg text-gray-900 font-semibold">&copy; <a href="https://juan-d-khusuma.web.app" target="_blank" className="underline">Juan Dharmananda Khusuma</a> • All Rights Reserved • Made with 💓</h1>
          <h1 className="text-xs text-center p-2 sm:text-sm md:text-base text-gray-800 font-semibold ">
            Powered by
            <a className="ml-2" target="_blank" href="https://vercel.com/home?utm_source=next-site&utm_medium=banner&utm_campaign=next-website"><Image width={50} height={10} src="/vercel.svg" alt="Vercel" /></a>
            <a className="ml-2" target="_blank" href="https://nextjs.org/"><Image width={35} height={18} src="/nextjs.svg" alt="NextJS" /></a>
            <a className="ml-2" target="_blank" href="https://tailwindcss.com/"><Image width={30} height={20} src="/tailwind.svg" alt="TailwindCSS" /></a>
            <a className="ml-2" target="_blank" href="https://expressjs.com/"><Image width={40} height={20} src="/express.svg" alt="ExpressJS" /></a>
          </h1>
        </footer>
        {/* Footer End */}      
    </>

  );
}

export default MyApp
