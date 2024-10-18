import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import SuggestionPage from "./pages/suggestion/index";
import ChatPage from "./pages/chat/index";
import ForYouPage from "./pages/forYou";
import ResetPassword from "./pages/resetPass/resetPassword";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>
    },
    {
        path: "/suggestions",
        element: <SuggestionPage />,
    },
    {
        path: "/chat",
        element: <ChatPage />,
    },
    {
        path: "/foryou",
        element: <ForYouPage />,
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />,
    },
    
]);

export default Router;