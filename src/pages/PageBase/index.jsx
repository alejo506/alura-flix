import Footer from "@/components/Footer";
import Header from "@/components/Header";
import VideosProvider  from "@/context/Videos";
import ContainerApp from "@/components/Container";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PageBase = () => {

    return (
        <main>
            <Header />

        <VideosProvider>

            <ContainerApp >
                <Outlet/>
                <ToastContainer />
            </ContainerApp>
            
        </VideosProvider>

            <Footer />
        
        </main>
    )
}

export default PageBase;