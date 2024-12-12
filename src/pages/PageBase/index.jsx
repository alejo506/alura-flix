import Footer from "@/components/Footer";
import Header from "@/components/Header";
import VideosProvider  from "@/context/Videos";
import ContainerApp from "@/components/Container";
import { Outlet } from "react-router-dom";
ContainerApp
const PageBase = () => {

    return (
        <main>
            <Header />

        <VideosProvider>

            <ContainerApp >
                <Outlet/>
            </ContainerApp>
            
        </VideosProvider>

            <Footer />
        
        </main>
    )
}

export default PageBase;